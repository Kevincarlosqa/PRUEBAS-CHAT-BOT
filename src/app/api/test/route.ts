import { Bot_sendKeyboard, genUrl } from '@/helpers/api/message';
import { goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import { getBodyInfo } from '@/helpers/stages/global';
import { createStep, createUser } from '@/helpers/stages/helpers';
import axios from 'axios';

const test = BigInt(1573982513)

export async function POST(request: Request) { 
  // const val = await prisma.answer.create({data:{name:'perro'}})
  // const url = genUrl('sendMessage',0)
  // const text = 'probando'
  // await axios.post(url,{text,chat_id:1573982513})

  // await createUser(test,'Carlos Test')
  // await createStep(test,1)
  const list = ['10','opcion']

  const body = await request.json()

  const {userId} = getBodyInfo(body)

 
  const route = genUrl('sendMessage',1)
  const keyboard = list.map(text => [{text}])
  const resize_keyboard = true
  const one_time_keyboard = true
  const reply_markup = {keyboard,resize_keyboard,one_time_keyboard}
  await axios.post(route,{text:'probandoando',chat_id:`${userId}`,reply_markup})
  
  // await Bot_sendKeyboard('hola',userId,1,list)
  
  
  return goodResponse('holi')
}