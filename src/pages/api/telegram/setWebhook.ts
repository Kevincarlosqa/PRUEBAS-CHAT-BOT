import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { topicsList } from '../../../helpers/infoBots';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const domain = process.env.DOMAIN_URL

  const genUrl = (token:string) => `https://api.telegram.org/bot${token}/setWebhook` // getWEbJookInfo
  const genHook = (route:string) => `${domain}/api/telegram/${route}`

  const hooks = []

  try{

    for(let i=1; i<topicsList.length; i++){
      const {webhook,key} = topicsList[i]
      if(!key) continue
      const url = genUrl(key)
      const hook = genHook(webhook)
  
      hooks.push(axios.post(url,{url:hook}))
    }

    const data = await Promise.all(hooks)
    return res.status(200).json(data)

  }catch(err){
    return res.status(400).json(err)
  }
}
