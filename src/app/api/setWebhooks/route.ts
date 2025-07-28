import { badResponse, goodResponse } from "@/helpers/api/response"
import { themeList } from "@/helpers/db/keys"
import axios from "axios"

const domain = process.env.DOMAIN_URL
const genUrl = (token:string) => `https://api.telegram.org/bot${token}/setWebhook`
const genHook = (route:string) => `${domain}/api/webhook/${route}`

export async function GET(request:Request) { 
  try{  
    const vals = []
    for(let theme of themeList){
      const {key,webhook} = theme
      if(!key) continue

      const url = genUrl(key)
      const hook = genHook(webhook)

      vals.push(axios.post(url,{url:hook}))
    }

    await Promise.all(vals)

    return goodResponse('WebHooks seteados con exito')
  }catch(err){
    return badResponse({err})
  }
}