import { genHTTP } from '@/helpers/telegram/helpers';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    const {body} = req


    try{
      await axios.post(genHTTP('sendMessage'),{
        chat_id: body.message.chat.id,
        text: 'Tu tienes un mensajito' + ' ' + JSON.stringify(body,null,2)
      })
      res.status(200).json({message: 'mensaje enviado correctamente'})
    }catch(err){
      console.log(err)
    }
}
