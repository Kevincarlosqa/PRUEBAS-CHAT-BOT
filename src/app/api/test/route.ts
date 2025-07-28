import { genUrl } from '@/helpers/api/message';
import { goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import { createStep, createUser } from '@/helpers/stages/helpers';
import axios from 'axios';

const test = BigInt(1573982513)

export async function GET(request: Request) { 
  // const val = await prisma.answer.create({data:{name:'perro'}})
  // const url = genUrl('sendMessage',0)
  // const text = 'probando'
  // await axios.post(url,{text,chat_id:1573982513})

  // await createUser(test,'Carlos Test')
  await createStep(test,1)
  return goodResponse('holi')
}