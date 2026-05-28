import { badResponse, goodResponse } from "@/helpers/api/response";
import { chat_with_bot, resErrorAns } from "@/helpers/stages/global";

const botIndex = 1

export async function POST(request:Request) {
  const body = await request.json() 
  // return goodResponse('Menu de temas enviado')
  try{
    const userId = await chat_with_bot(body,botIndex)
    
    return goodResponse(`Interaccion de ${userId} en el chat: ${botIndex}`)
    
  }catch(err){
    await resErrorAns(err)
    return badResponse(`Error en la interaccion`) 
  }
}