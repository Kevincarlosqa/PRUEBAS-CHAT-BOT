import { useId } from "react";
import { Bot_sendMsg } from "../api/message";
import { stage_data, welcome_data } from "../types/stages";
import { createStep } from "./helpers";
import { stage_start } from "./stage_start";
import { prisma } from "../db/prisma";
import { errorResponse } from "../api/response";

const mess = (msg:string) => `Bienvenido ${msg}      
    Nos alegra tenerte aquí. Este espacio ha sido diseñado especialmente para que puedas aprender, explorar y fortalecer tus conocimientos en odontología a través del análisis de casos clínicos reales.
    Aquí no solo encontrarás información, sino también herramientas para reflexionar, cuestionar y aplicar lo aprendido en situaciones concretas. Queremos acompañarte en cada paso de tu proceso formativo, brindándote contenidos claros, prácticos y actualizados.
    Prepárate para observar, pensar y decidir como un profesional. 
    ¡Comencemos!`


export const stage_welcome = async (inputInfo:welcome_data) => {
  const { userId, userName, botIndex } = inputInfo
  
  try{
    const { id:themeId } = await prisma.theme.findFirst({where:{botIndex}}) || {id:0}
    
    const text = mess(userName)
    
    await Bot_sendMsg(text,userId,botIndex)
    await createStep(userId,themeId)
    
    const data = {
      userId,userName,botIndex,themeId,
      id:0,
      input:'',
      errors:0,
      caseId:0,
      paperId:0,
      stage:0,
    }
    
    await stage_start(data)
  }catch{
    errorResponse(`Error en stage welcome`,inputInfo)
  }
}