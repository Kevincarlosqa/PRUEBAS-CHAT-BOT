// import { saveUserInfo, searchUser } from '@/helpers/json_routes';
import { getBodyInfo } from '@/helpers/chatBot';
import {  Bot_sendInlineKeyboard, Bot_SendMessage, genHTTP } from '@/helpers/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { topicsList } from './infoBots';
import axios from 'axios';


// export const Bot_sendInlineKeyboard1 = async (text:string,chat_id:number,options:string[],botIndex:number=0) => {
//   const route = genHTTP(send,botIndex)
//   const inline_keyboard = options.map((el,ix) => [{text:el.text,url:el.url}])
//   const reply_markup = {
//     inline_keyboard
//   }
//   await axios.post(route,{text,chat_id,reply_markup})
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req
  const {userId:chat_id} = getBodyInfo(body)

  try{
    const inline_keyboard = []
    
    for(let i=1; i<topicsList.length; i++){
      const {key,link,name} = topicsList[i]
      if(!key || !link || !name) continue

      const val = [{text:name,url:link}]
      inline_keyboard.push(val)
    }

    const route = genHTTP('sendMessage',0)
    const reply_markup = { inline_keyboard }


    const chatBotList = [
      't.me/Tema01DemoDentistBot',
      't.me/Tema02DemoDentistBot',
      't.me/Tema03DemoDentistBot',
      't.me/Tema04DemoDentistBot',
      't.me/Tema05DemoDentistBot',
    ]
    const text = 'Hola, bienvenido al menu de temas, por favor selecciona el tema que desees'


    await axios.post(route,{text,chat_id,reply_markup})
    // await Bot_sendInlineKeyboard(text,userId,chatBotList)
    return res.status(200).json({message: `interaccion del user ${chat_id}`})

  }catch(err){
    try{
      await Bot_SendMessage(JSON.stringify(err,null,2),1573982513)
      return res.status(200).json(err)
    }catch(err){
      return res.status(400).json(err)
    }
  }
}