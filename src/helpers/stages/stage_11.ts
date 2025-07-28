import { Bot_sendKeyboard, Bot_sendMsg, Bot_sendMsgBadChoice } from "../api/message";
import { errorResponse } from "../api/response";
import { prisma } from "../db/prisma";
import { stage_data } from "../types/stages";
import { updateStage, updateStep } from "./helpers";
import { stage_09 } from "./stage_09";

//* MENU DE LIBROS
  export const stage_11 = async (inputInfo:stage_data) => {
    const { themeId, userId, botIndex, id } = inputInfo

    try{
      const papers = await prisma.paper.findMany({where:{themes:{some:{themeId}}}})
      
      if(!papers){
        await Bot_sendMsg('No hay contenidos para este tema :C',userId,botIndex)
        return stage_09(inputInfo)
      }
      
      const list = papers.map(el => el.title)
      
      await Bot_sendKeyboard('Selecciona un contenido',userId,botIndex,list)
      await updateStage(id,6)
    }catch{
      errorResponse(`Error en el stage11`,inputInfo)
    }
  }


//* RESPUESTA AL MENU DE LIBROS
  export const stage_12 = async (inputInfo:stage_data) => {
    const { input, userId, botIndex, id } = inputInfo
    
    try{
      const paper = await prisma.paper.findFirst({where:{autor:input}})
        
      if(!paper){
        await Bot_sendMsgBadChoice(userId,botIndex)
        return await stage_11(inputInfo)
      }

      const paperId = paper.id
      await updateStep(id,{paperId,stage:7})
      await Bot_sendMsg('Cual es tu consulta?',userId,botIndex)
    }catch{
      errorResponse(`Error en el stage12`,inputInfo)
    }
  }

