import { badResponse, goodResponse } from "@/helpers/api/response";
import { chat_with_bot, resErrorAns } from "@/helpers/stages/global";

const botIndex = 3

export async function POST(request:Request) {
  try{
    return goodResponse(`Quitar cuando se tenga informacion con el tema 3`)


    const body = await request.json()

    const userId = await chat_with_bot(body,botIndex)
    
    return goodResponse(`Interaccion de ${userId} en el chat: ${botIndex}`)
  }catch(err){
    await resErrorAns(err)
    return badResponse({err})
  }
}