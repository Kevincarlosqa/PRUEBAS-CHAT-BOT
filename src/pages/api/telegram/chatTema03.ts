// import { saveUserInfo, searchUser } from '@/helpers/json_routes';
import { Bot_SendMessage } from '@/helpers/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { chat_with_bot } from '@/helpers/chatBot';


const botIndex = 3

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req

  try{
    const userId = await chat_with_bot(body,botIndex)

    return res.status(200).json({message: `interaccion del user ${userId}`})

  }catch(err){
    try{
      await Bot_SendMessage(JSON.stringify(err,null,2),1573982513)
      return res.status(200).json(err)
    }catch(err){
      return res.status(400).json(err)
    }
  }
}