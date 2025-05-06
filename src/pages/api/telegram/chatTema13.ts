import type { NextApiRequest, NextApiResponse } from 'next';
import { chat_with_bot, resErrorAns } from '@/helpers/chatBot';


const botIndex = 13

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req

  try{
    const userId = await chat_with_bot(body,botIndex)

    return res.status(200).json({message: `interaccion user: ${userId}, chat ${botIndex}`})

  }catch(err){
    await resErrorAns(err)
    return res.status(400).json(err)
  }
}