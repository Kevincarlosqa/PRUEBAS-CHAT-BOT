import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = process.env.TELEGRAM_TEMA_01_KEY;
  const url = `https://api.telegram.org/bot${token}/setWebhook`;

  const url1 = `https://api.telegram.org/bot${token}/getWebhookInfo`;

  const webhookUrl = `${process.env.DOMAIN_URL}/api/telegram/chatTema05`; // URL de tu aplicación Next.js



  try{
    // const {data} = await axios.post(url,{url:webhookUrl});
    const {data} = await axios.post(url1);
    return res.status(200).json(data)

  }catch(err){
    return res.status(400).json(err)
  }

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     url: webhookUrl,
  //   }),
  // });

  // const data = await response.json();

}
