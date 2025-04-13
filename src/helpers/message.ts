import axios from "axios"

type BotRoute = 'sendMessage' | 'editMessageText' | 'sendPhoto'

const send = 'sendMessage'

const chat_chrls1 = 1573982513
const chat_chrls2 = 1568853312


export const genHTTP = (method:BotRoute) => {
  const base = 'https://api.telegram.org/bot'
  const key = process.env.TELEGRAM_KEY
  return base+key+'/'+method
}

export const Bot_SendMessage = async (text:string,chat_id:number) => {
  const route = genHTTP(send)
  await axios.post(route,{text,chat_id})
}

export const Bot_BadOptionMessage = async (chat_id:number) => {
  const route = genHTTP(send)
  const text = 'Debes elegir una de las opciones.'
  await axios.post(route,{text,chat_id})
}

export const Bot_SendKeyboard = async (text:string,chat_id:number,options:string[]) => {
  const route = genHTTP(send)
  const keyboard = options.map(text => [{text}])
  const resize_keyboard = true
  const one_time_keyboard = true
  const reply_markup = {keyboard,resize_keyboard,one_time_keyboard}
  await axios.post(route,{text,chat_id,reply_markup})
}

export const Bot_SendPhoto = async (url:string,chat_id:number) => {
  const route = genHTTP('sendPhoto')
  const photo = url
  await axios.post(route,{chat_id,photo})
}


// const genReplyMarkup = (options:[[string,string]]) => {
//   const inline_keyboard = options.map(([text,callback_data]) => [{text,callback_data}])
//   return {inline_keyboard}
// }

// export const Bot_SendOptions = async (text:string,chat_id:number,options:[[string,string]]) => {
//   const route = genHTTP("sendMessage")
//   const reply_markup = genReplyMarkup(options)
//   await axios.post(route,{chat_id,text,reply_markup})
// }

// export const Bot_EditMessage = async (message_id:number,text:string,chat_id:number,options?:[[string,string]]) => {
//   const route = genHTTP("editMessageText")
//   const data = {message_id,text,chat_id}
  
//   if(!options) return await axios.post(route,data)

//   const reply_markup = genReplyMarkup(options)
//   await axios.post(route,{...data,reply_markup})
// }