import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';

export async function GET() { 
  try{  
    const ans = await prisma.theme.findMany()
    return goodResponse('Opciones de diagnostico',ans)
  }catch(err){
    return badResponse({err})
  }
}

export async function POST(request:Request){
  try{
    const body:string[] = await request.json()
    const data = body.map(el => ({name:el.toLowerCase()}))

    await prisma.answer.createMany({data,skipDuplicates:true})

    return goodResponse('Opciones subidas correctamente')
  }catch(err){
    return badResponse({err})
  }
}