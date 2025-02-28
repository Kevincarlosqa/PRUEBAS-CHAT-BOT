import axios from "axios"
import { InlineKeyboardSend, TextSend } from "./types/body"

type BotRoute = 'sendMessage' | 'editMessageText'

export const genHTTP = (method:BotRoute) => {
  const base = 'https://api.telegram.org/bot'
  const key = process.env.TELEGRAM_KEY
  return base+key+'/'+method
}


export const Bot_SendMessage = async (data:TextSend) => {
  const route = genHTTP("sendMessage")
  await axios.post(route,data)
}

export const Bot_SendOptions = async (data:InlineKeyboardSend) => {
  const route = genHTTP("sendMessage")
  await axios.post(route,data)
}

export const Bot_EditMessage = async (data: TextSend | InlineKeyboardSend,message_id:number) => {
  const route = genHTTP("editMessageText")
  await axios.post(route,{...data,message_id})
}