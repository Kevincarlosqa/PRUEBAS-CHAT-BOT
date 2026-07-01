import { errorResponse } from "./response";
import { themeList } from "../db/keys";
import axios from "axios";

const sendMsg = "sendMessage";
const sendPho = "sendPhoto";

type typeAction = "sendMessage" | "sendPhoto";

export const genUrl = (method: typeAction, botIndex: number) => {
  const base = "https://api.telegram.org/bot";
  const key = themeList[botIndex].key;
  return `${base}${key}/${method}`;
};

export const Bot_sendMsg = async (
  text: string,
  userId: string,
  botIndex: number,
) => {
  const url = genUrl(sendMsg, botIndex);
  try {
    await axios.post(url, { text, chat_id: userId });
  } catch (err) {
    errorResponse(`Error el enviar un mensaje a ${userId}`);
  }
};

export const Bot_sendMsgBadChoice = async (
  userId: string,
  botIndex: number,
) => {
  const url = genUrl(sendMsg, botIndex);
  const text =
    "Por favor selecciona una alternativa válida del menú para continuar con el caso clínico.";
  try {
    await axios.post(url, { text, chat_id: userId });
  } catch (err) {
    errorResponse(`Error al enviar un mensaje a ${userId}`);
  }
};

export const Bot_sendKeyboard = async (
  text: string,
  userId: string,
  botIndex: number,
  options: string[],
) => {
  const url = genUrl(sendMsg, botIndex);
  const keyboard = options.map((text) => [{ text }]);
  const resize_keyboard = true;
  const one_time_keyboard = true;
  const reply_markup = { keyboard, resize_keyboard, one_time_keyboard };
  await axios.post(url, { text, chat_id: userId, reply_markup });
};

// export const Bot_SendKeyboard = async (text:string,chat_id:string,botIndex:number,options:string[]) => {
//   const route = genUrl(sendMsg,botIndex)
//   const keyboard = options.map(el => [{text:el}])
//   const resize_keyboard = true
//   const one_time_keyboard = true
//   const reply_markup = {keyboard,resize_keyboard,one_time_keyboard}
//   await axios.post(route,{text,chat_id,reply_markup})
// }

export const Bot_sendPhoto = async (
  photo: string,
  userId: string,
  botIndex: number,
) => {
  const url = genUrl(sendPho, botIndex);
  try {
    await axios.post(url, { photo, chat_id: userId });
  } catch (err) {
    errorResponse(`Error al enviar una foto a ${userId}`);
  }
};

export const Bot_sendInlineKeyboard = async (
  text: string,
  userId: string,
  botIndex: number,
  options: string[],
) => {
  const url = genUrl(sendMsg, botIndex);
  const inline_keyboard = options.map((el) => [{ text: el, url: el }]);
  const reply_markup = { inline_keyboard };
  try {
    await axios.post(url, { text, chat_id: userId, reply_markup });
  } catch (err) {
    errorResponse(`Error al enviar el inline_keyboard ${userId}`);
  }
};
