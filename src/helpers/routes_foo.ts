import axios from "axios"

type BotRoute = 'sendMessage' | 'editMessageText'

export const genHTTP = (method:BotRoute) => {
  const base = 'https://api.telegram.org/bot'
  const key = process.env.TELEGRAM_KEY
  return base+key+'/'+method
}


export const Bot_SendMessage = async (text:string,chat_id:number) => {
  const route = genHTTP("sendMessage")
  await axios.post(route,{text,chat_id})
}

const genReplyMarkup = (options:[[string,string]]) => {
  const inline_keyboard = options.map(([text,callback_data]) => [{text,callback_data}])
  return {inline_keyboard}
}

export const Bot_SendOptions = async (text:string,chat_id:number,options:[[string,string]]) => {
  const route = genHTTP("sendMessage")
  const reply_markup = genReplyMarkup(options)
  await axios.post(route,{chat_id,text,reply_markup})
}

export const Bot_EditMessage = async (message_id:number,text:string,chat_id:number,options?:[[string,string]]) => {
  const route = genHTTP("editMessageText")
  const data = {message_id,text,chat_id}
  
  if(!options) return await axios.post(route,data)

  const reply_markup = genReplyMarkup(options)
  await axios.post(route,{...data,reply_markup})
}