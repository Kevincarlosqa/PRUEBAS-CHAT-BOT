import { getBodyInfo, resErrorAns } from '@/helpers/chatBot';
import { genHTTP } from '@/helpers/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { topicsList } from '../../../helpers/infoBots';
import axios from 'axios';


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

    const text = 'Hola, bienvenido al menu de temas, por favor selecciona el tema que desees'

    await axios.post(route,{text,chat_id,reply_markup})

    return res.status(200).json({message: `interaccion del user ${chat_id}`})

  }catch(err){
    await resErrorAns(err)
    return res.status(400).json(err)
  }
}