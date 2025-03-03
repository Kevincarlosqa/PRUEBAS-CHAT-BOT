import { genHTTP } from '@/helpers/helpers';
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


  // CASO 0 => eL El clienate no esta en la base de datos







export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    const {body} = req
    const [text,chat_id] = getResponseValue(body)


    

    try{
      await axios.post(genHTTP('sendMessage'),{ chat_id, text})
      return res.status(200).json({message: 'mensaje enviado correctamente'})
    }catch(err){
      return console.log(err)
    }
}


