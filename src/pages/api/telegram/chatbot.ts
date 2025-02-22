import { genHTTP } from '@/helpers/telegram/helpers';
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
  
    const {body} = req
    const { message } = req.body;
    const chatId = message.chat.id;
    console.log(chatId)

    let msg = 'vacio'
  
    // if (req.body.callback_query) {
    //   const callbackId = req.body.callback_query.id;
    
    //   await axios.post(genHTTP('answerCallbackQuery'), {
    //     callback_query_id: callbackId,
    //     text: "Opción recibida ✅",
    //     show_alert: false
    //   });
    
    // }
    if (body.callback_query) {
      // 📌 Respuesta a Inline Keyboard
      const chatId = body.callback_query.message.chat.id;
      const callbackData = body.callback_query.data;
      const messageId = body.callback_query.message.message_id;
  
      console.log("Callback recibido:", callbackData);
  
      // 📌 Responder según el botón presionado
      let responseText = "Opción no reconocida.";
      if (callbackData === "opcion1") responseText = "Elegiste Opción 1 🎉";
      if (callbackData === "opcion2") responseText = "Elegiste Opción 2 🎯";
  
      // 📌 Enviar una edición al mensaje original
      await axios.post(genHTTP('editMessageText'),{
        chat_id: chatId,
        message_id: messageId,
        text: responseText
      })
  
    }

    try{
      await axios.post(genHTTP('sendMessage'),{
        chat_id:chatId,
        text: msg + ' ' + JSON.stringify(req.body,null,2)
      })
      res.status(200).json({message: 'mensaje enviado correctamente'})
    }catch(err){
      await axios.post(genHTTP('sendMessage'),{
        chat_id:chatId,
        text: msg + ' ' + JSON.stringify(err,null,2)
      })
    }
}

// async function sendTelegramMessage(chatId: number, text: string) {
//   const token = process.env.TELEGRAM_KEY;
//   const url = `https://api.telegram.org/bot${token}/sendMessage`;

//   await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       chat_id: chatId,
//       text: text,
//     }),
//   });
// }