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
  
    const { message } = req.body;
    const chatId = message.chat.id;
    // const text = message.text;

    // if (req.body.callback_query) {
    //   const callbackId = req.body.callback_query.id;
    
    //   await axios.post(genHTTP('answerCallbackQuery'), {
    //     callback_query_id: callbackId,
    //     text: "Opción recibida ✅",
    //     show_alert: false
    //   });
    
    // }

    try{
      await axios.post(genHTTP('sendMessage'),{
        chat_id:chatId,
        text: JSON.stringify(req.body,null,2)
      })
      res.status(200).json({message: 'mensaje enviado correctamente'})
    }catch(err){
      console.log(err)
    }
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