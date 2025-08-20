import { Bot_sendMsg } from "@/helpers/api/message";
import { badResponse, goodResponse } from "@/helpers/api/response";
import { chat_with_bot, getBodyInfo, resErrorAns } from "@/helpers/stages/global";

const botIndex = 2

export async function POST(request:Request) {
  try{
    return goodResponse(`Quitar cuando se tenga informacion con el tema 2`)
    const body = await request.json()

    const {userId} = getBodyInfo(body)

    await Bot_sendMsg(JSON.stringify(body,null,2),'1573982513',0)

    
    return goodResponse(`Interaccion de ${userId} en el chat: ${botIndex}`)
  }catch(err){
    await resErrorAns(err)
    return badResponse({err})
  }
}