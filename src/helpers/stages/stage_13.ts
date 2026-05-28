import { Bot_sendMsg } from "../api/message";
import { stage_data } from "../types/stages"
import { stage_09 } from "./stage_09";
import { errorResponse } from "../api/response";
import { ragAnswer } from "../openAi/rag_answer";
import { prisma } from "@/lib/prisma";



//* RESPUESTA AL CONTENIDO
export const stage_13 = async (inputInfo:stage_data) => {
  const { input, userId, botIndex, paperId } = inputInfo
  
  if(!paperId) return 
  
  try{
    await prisma.question.create({data:{userId,question:input}})
    const answer = await ragAnswer(input,paperId)

    await Bot_sendMsg(answer,userId,botIndex)
    await stage_09(inputInfo)
  }catch{
    errorResponse(`Error en el stage13`,inputInfo)
  }
}