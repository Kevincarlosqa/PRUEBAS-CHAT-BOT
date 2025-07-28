import { goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';

export async function GET(request: Request) { 
  // const val = await prisma.answer.create({data:{name:'perro'}})
  return goodResponse('holi')
}