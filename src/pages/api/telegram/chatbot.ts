import { saveUserInfo, searchUser } from '@/helpers/json_routes';
import { Bot_SendMessage, genHTTP } from '@/helpers/routes_foo';
import { UserData } from '@/helpers/types/json';
import { ResChatInlineKeyboard, ResChatText } from '@/helpers/types/resInput';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Body = ResChatText | ResChatInlineKeyboard

// HELPERS
  // Obtener el valor del input
    const isResChat         = (body:Body): body is ResChatText => 'message' in body
    const getResponseValue  = (body:any):[string,number] => {
      if(isResChat(body)){
        const base = body.message
        return [base.text, base.from.id]
      }else{
        const base = body.callback_query
        return [base.data, base.from.id]
      }
    }
  
  // STAGE 0 => Es la primera interaccion del usuario con el bot
    const stage0 = async (chat_id:number) => {
      const text = 'Bienvenido al proyecto CHATBOT DENTISTA: TALA PUTO'
      try{
        await Bot_SendMessage(text,chat_id)
        //agregar el estage 1
        await saveUserInfo(chat_id,2)
      }catch(err){
        return console.log(err)
      }
    }
  
    // STAGE 1 => Se muestran los casos clinicos disponibles








export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const stages = [stage0]


    const {body} = req
    // const [text,chat_id] = getResponseValue(body)
    // const {stage,message_id} = await searchUser(chat_id)

    

    const chat_id = 1568853312
    const text = JSON.stringify(body,null,2)

    try{
      await axios.post(genHTTP('sendMessage'),{ chat_id, text})
      return res.status(200).json({message: 'mensaje enviado correctamente'})
    }catch(err){
      return console.log(err)
    }
}


