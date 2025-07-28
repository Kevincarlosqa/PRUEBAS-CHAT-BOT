import { genUrl } from '@/helpers/api/message';
import { goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import axios from 'axios';

export async function GET(request: Request) { 
  // const val = await prisma.answer.create({data:{name:'perro'}})
  const url = genUrl('sendMessage',0)
  const text = 'probando'
  await axios.post(url,{text,chat_id:1573982513})

  return goodResponse('holi')
}