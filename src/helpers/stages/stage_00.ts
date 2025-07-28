import { Bot_sendKeyboard, Bot_sendMsg, Bot_sendMsgBadChoice } from "../api/message";
import { prisma } from "../db/prisma";
import { stage_data } from "../types/stages";
import { updateStage, updateStep } from "./helpers";
import { stage_02 } from "./stage_02";

//* ENVIO DE CASOS DISPONIBLES
  export const stage_00 = async (inputInfo:stage_data) => {
    const { userId, themeId, botIndex, id } = inputInfo
    const text = 'Tenemos estos casos clinicos para que analices. Estas listo?'

    const list = await prisma.case.findMany({where:{themes:{some:{themeId}}},select:{title:true}})
    const list_cases = list.map( el => el.title)

    await Bot_sendKeyboard(text,userId,botIndex,list_cases)
    await updateStage(id,1)
  }

//* RESPUESTA A CASOS DISPONIBLES
  export const stage_01 = async (inputInfo:stage_data) => {
    const { input:title , userId, botIndex, id } = inputInfo
    const caso = await prisma.case.findFirst({where:{title}})
    
    if(!caso){
      await Bot_sendMsgBadChoice(userId,botIndex)
      return await stage_00(inputInfo)
    }

    const { id:caseId, exam } = caso
    await Bot_sendMsg(exam,userId,botIndex)
    await updateStep(id,{caseId})
    await stage_02(inputInfo)
  }