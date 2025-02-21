import { genHTTP } from '@/helpers/telegram/helpers';
import { CallbackQuery } from '@telegraf/types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type TelegramMessage = {
  message: {
    chat: {
      id: number;
    };
    text: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('recibiendo algo')
  
  // if (req.method === 'POST') {
    const { message } = req.body;

      const chatId = message.chat.id;
      const text = message.text;

      // const data = callback_query.data
      // console.log(text)
      // Aquí puedes manejar el mensaje de los usuarios
      try{
        await axios.post(genHTTP('sendMessage'),{
          chat_id:chatId,
          text: `Elije una opcion [${JSON.stringify(req.body)}]`,
          "reply_markup": {
            "inline_keyboard": [
              [
                { "text": "Opción 1", "callback_data": "eres cabro" },
                { "text": "Opción 2", "callback_data": "el layme es cabro" }
              ]
            ]
          }
        })
        res.status(200).json({message: 'mensaje enviado correctamente'})
      }catch(err){
        console.log(err)
      }
      // res.status(200).json({ message: 'todo ok' });

  // } else {
  //   res.status(405).json({ error: 'Method Not Allowed' });
  // }
}

async function sendTelegramMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_KEY;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });
}