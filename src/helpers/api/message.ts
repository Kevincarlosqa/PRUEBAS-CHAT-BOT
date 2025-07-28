import { themeList } from "../db/keys"
import axios from "axios"


const sendMsg = 'sendMessage' 
const sendPho = 'sendPhoto'

type typeAction = 'sendMessage' | 'sendPhoto'



const genUrl = (method:typeAction,botIndex:number) => {
  const base = 'https://api.telegram.org/bot'
  const key = themeList[botIndex].key
  return `${base}${key}/${method}`
}

export const Bot_sendMsg = async (text:string,userId:bigint,botIndex:number) => {
  const url = genUrl(sendMsg,botIndex)
  
  await axios.post(url,{text,chat_id:userId})
}

export const Bot_sendMsgBadChoice = async (userId:bigint, botIndex:number) => {
  const url = genUrl(sendMsg,botIndex)
  const text = 'Debes elegir una opcion de la lista'

  await axios.post(url,{text,chat_id:userId})
}

export const Bot_sendKeyboard = async (text:string,userId:bigint,botIndex:number,options:string[]) => {
  const url = genUrl(sendMsg,botIndex)
  const keyboard = options.map( text => [{text}])
  const resize_keyboard = true
  const one_time_keyboard = true
  const reply_markup = {keyboard,resize_keyboard,one_time_keyboard}
  
  await axios.post(url,{text,chat_id:userId,reply_markup})
}

export const Bot_sendPhoto = async (photo:string,userId:bigint,botIndex:number) => {
  const url = genUrl(sendPho,botIndex)

  await axios.post(url,{photo,chat_id:userId})
}


export const Bot_sendInlineKeyboard = async (text:string,userId:bigint,botIndex:number,options:string[]) => {
  const url = genUrl(sendMsg,botIndex)
  const inline_keyboard = options.map(el => [{text:el,url:el}])
  const reply_markup = {inline_keyboard}

  await axios.post(url,{text,chat_id:userId,reply_markup})
}

