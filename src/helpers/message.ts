import { topicsList } from "@/pages/api/telegram/infoBots"
import axios from "axios"

type BotRoute = 'sendMessage' | 'editMessageText' | 'sendPhoto' 

const send = 'sendMessage'



const keys =  topicsList.map(el => el.key)

export const genHTTP = (method:BotRoute,keyIndex:number) => {
  const base = 'https://api.telegram.org/bot'
  const key = keys[keyIndex]
  return base+key+'/'+method
}

export const Bot_SendMessage = async (text:string,chat_id:number,botIndex:number=0) => {
  const route = genHTTP(send,botIndex)
  await axios.post(route,{text,chat_id})
}

export const Bot_BadOptionMessage = async (chat_id:number,botIndex:number=0) => {
  const route = genHTTP(send,botIndex)
  const text = 'Debes elegir una de las opciones.'
  await axios.post(route,{text,chat_id})
}

export const Bot_SendKeyboard = async (text:string,chat_id:number,options:string[],botIndex:number=0) => {
  const route = genHTTP(send,botIndex)
  const keyboard = options.map(text => [{text}])
  const resize_keyboard = true
  const one_time_keyboard = true
  const reply_markup = {keyboard,resize_keyboard,one_time_keyboard}
  await axios.post(route,{text,chat_id,reply_markup})
}

export const Bot_SendPhoto = async (url:string,chat_id:number,botIndex:number=0) => {
  const route = genHTTP('sendPhoto',botIndex) 
  const photo = url
  await axios.post(route,{chat_id,photo})
}


export const Bot_sendInlineKeyboard = async (text:string,chat_id:number,options:string[],botIndex:number=0) => {
  const route = genHTTP(send,botIndex)
  const inline_keyboard = options.map((el,ix) => [{text:el.text,url:el.url}])
  const reply_markup = {
    inline_keyboard
  }
  await axios.post(route,{text,chat_id,reply_markup})
}
