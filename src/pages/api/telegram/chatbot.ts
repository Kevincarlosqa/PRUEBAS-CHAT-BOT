// import { saveUserInfo, searchUser } from '@/helpers/json_routes';
import { getBodyInfo } from '@/helpers/chatBot';
import {  Bot_sendInlineKeyboard, Bot_SendMessage } from '@/helpers/message';
import { resUserMessage } from '@/helpers/types';
import type { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {body} = req
  const {userId} = getBodyInfo(body)

  try{

    const chatBotList = [
      't.me/Tema01DemoDentistBot',
      't.me/Tema02DemoDentistBot',
      't.me/Tema03DemoDentistBot',
      't.me/Tema04DemoDentistBot',
      't.me/Tema05DemoDentistBot',
    ]
    const text = 'Hola, bienvenido al menu de temas, por favor selecciona el tema que desees'

    await Bot_sendInlineKeyboard(text,userId,chatBotList)
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