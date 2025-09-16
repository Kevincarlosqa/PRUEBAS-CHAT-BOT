import { Bot_sendMsg } from "@/helpers/api/message";
import { badResponse, goodResponse } from "@/helpers/api/response";
import { chat_with_bot, getBodyInfo, resErrorAns } from "@/helpers/stages/global";

const botIndex = 2

export async function POST(request:Request) {
  const body = await request.json() 

  try{
    const {input,userId,userName} = getBodyInfo(body)
    Bot_sendMsg('Aun no hay casos para este chat',userId,botIndex)
    
    // const userId = await chat_with_bot(body,botIndex)
    
    return goodResponse(`Interaccion de ${userId} en el chat: ${botIndex}`)
    
  }catch(err){
    await resErrorAns(err)
    return badResponse(`Error en la interaccion`) 
  }
}