import { Bot_sendMsg } from "../api/message";
import { stage_data } from "../types/stages"
import OpenAI from "openai";
import { stage_09 } from "./stage_09";



const ansQuestion = async (input:string) => {
  const client = new OpenAI();

  const response = await client.responses.create({
    model: 'gpt-3.5-turbo',
    instructions: 'Habla como un dentista sindecirlo',
    input
  })

  return response.output_text
}

//* RESPUESTA AL CONTENIDO
export const stage_13 = async (inputInfo:stage_data) => {
  const { input, userId, botIndex, paperId } = inputInfo
  
  const answer = await ansQuestion(input)
  await Bot_sendMsg(answer,userId,botIndex)
  await stage_09(inputInfo)
}