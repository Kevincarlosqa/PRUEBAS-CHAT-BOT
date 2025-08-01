import { Bot_sendMsg } from "../api/message";
import { stage_data } from "../types/stages"
import OpenAI from "openai";
import { stage_09 } from "./stage_09";
import { errorResponse } from "../api/response";
import { prisma } from "../db/prisma";
import { ragAnswer } from "../openAi/rag_answer";



const ansQuestion = async (input:string) => {
  const client = new OpenAI();
  
  try{
    const response = await client.responses.create({
      model: 'gpt-3.5-turbo',
      instructions: 'Habla como un dentista sindecirlo',
      input
    })
    
    return response.output_text
  }catch{
    errorResponse(`Error en responder con la IA`)
  }
}

//* RESPUESTA AL CONTENIDO
export const stage_13 = async (inputInfo:stage_data) => {
  const { input, userId, botIndex, paperId } = inputInfo
  
  if(!paperId) return 
  
  try{

    const vectors = await prisma.embedding.findMany({where:{paperId}})

    const answer = await ragAnswer(input,vectors)

    // const answer = await ansQuestion(input) || 'Ups'
    await Bot_sendMsg(answer,userId,botIndex)
    await stage_09(inputInfo)
  }catch{
    errorResponse(`Error en el stage13`,inputInfo)
  }
}