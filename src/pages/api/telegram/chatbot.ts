import { genHTTP } from '@/helpers/helpers';
import { ResChatInlineKeyboard, ResChatText } from '@/helpers/types/resInput';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Body = ResChatText | ResChatInlineKeyboard

// HELPERS
  // Obtener el valor del mensaje
  const isResChat = (body:Body): body is ResChatText => 'message' in body
  const getResponseValue = (body:any):string => { // obtener el valor de
    return isResChat(body) ? body.message.text : body.callback_query.data
  }










export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    const {body} = req
    const value = getResponseValue(body)

    try{
      await axios.post(genHTTP('sendMessage'),{
        chat_id: 1568853312,
        text: value
      })
      res.status(200).json({message: 'mensaje enviado correctamente'})
    }catch(err){
      console.log(err)
    }
}


