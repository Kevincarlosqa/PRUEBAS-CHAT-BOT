import { badResponse, goodResponse } from "@/helpers/api/response";
import { chat_with_bot, resErrorAns } from "@/helpers/stages/global";

const botIndex = 2

export async function PPST(request:Request) {
  try{
    const body = await request.json()

    const userId = await chat_with_bot(body,botIndex)
    
    return goodResponse(`Interaccion de ${userId} en el chat: ${botIndex}`)
  }catch(err){
    await resErrorAns(err)
    return badResponse({err})
  }
}