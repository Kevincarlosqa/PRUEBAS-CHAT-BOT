import axios from "axios";
import { Bot_sendMsg, genUrl } from "../api/message";
import { prisma } from "../db/prisma";
import { botResponse } from "../types/botResponse";
import { stage_data } from "../types/stages";
import { createUser } from "./helpers";
import { stage_00, stage_01 } from "./stage_00";
import { stage_03 } from "./stage_02";
import { stage_05, stage_07 } from "./stage_04";
import { stage_10 } from "./stage_09";
import { stage_12 } from "./stage_11";
import { stage_13 } from "./stage_13";
import { stage_welcome } from "./stage_welcome";
import { errorResponse } from "../api/response";

export const getBodyInfo = (body:botResponse) => {
  const { message } = body
  const { text, chat } = message
  const { id, first_name, last_name } = chat

  const userName = `${first_name} ${last_name}`
  const userId = `${id}`
  const input = text

  return {userName,userId,input}
}

/** Respuestas
 * casos: stage 00                    0
 * Menu disponibles: stage 01         1
 * Menu general: stage 03             2
 * Menu diagnostico: stage 05         3
 * Menu Incorrecto: stage 07          4
 * Menu mas informacion: stage 10     5
 * menu libros: stage 12              6
 * Contenido IA: stage 13             7
 */

const stages:Function[] = [
  stage_00,stage_01,stage_03,stage_05,stage_07,stage_10,stage_12,stage_13
]

export const chat_with_bot = async (body:botResponse,botIndex:number) => {
  const {input,userId,userName} = getBodyInfo(body)

  try{
    const user = await prisma.user.findFirst({where:{id:userId}})
    
    if(!user) await createUser(userId,userName)
      
    const step = await prisma.step.findFirst({where:{userId,theme:{botIndex}}})
      
    if(step){
      const {stage} = step
      const data:stage_data = {...step, input, botIndex, userName}
      await stages[stage](data)
    }else{
      await stage_welcome({userId,userName,botIndex})
    }
    return userId
  }catch(err){
    errorResponse(`Error al hacer la interaccion con ${userId} y entrad: ${input}`,{err})
  }
}

const chat_chrls1 = 1573982513
const chat_chrls2 = 1568853312
const chat_kevin = 6141714656

export const resErrorAns = async (err:any) => {
  const url = genUrl('sendMessage',0)
  const text = JSON.stringify(err,null,2)
  try{
    await axios.post(url,{text,chat_id:chat_chrls1})
  }catch(err){
    errorResponse(`Error al enviar la bad_response a ${chat_chrls1}`,{err})
  }
}