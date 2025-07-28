import { Bot_sendKeyboard, genUrl } from "@/helpers/api/message";
import { badResponse, goodResponse } from "@/helpers/api/response";
import { themeList } from "@/helpers/db/keys";
import { getBodyInfo } from "@/helpers/stages/global";
import axios from "axios";


export async function GET(request:Request) {
  const body = await request.json()
  const { userId } = getBodyInfo(body)

  try{
    const inline_keyboard = []
    for(let i=0; i<themeList.length; i++){
      const { key, link, name } = themeList[i]
      if(!key || !link || !name) continue

      const val = [{text:name,url:link}]
      inline_keyboard.push(val)
    }

    const route = genUrl('sendMessage',0)
    const reply_markup = { inline_keyboard }

    const text = 'Hola, bienvenido al menu de temas, porfavor selecciona el que desees'

    await axios.post(route,{text,chat_id:userId,reply_markup})

    return goodResponse('holi')
    
  }catch(err){
    return badResponse({err})
  }
}

Bot_sendKeyboard