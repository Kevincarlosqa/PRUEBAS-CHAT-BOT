import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';

/**
 * Agregar un paper
 * Editar un paper
 * Obtener los paper
 */



export async function GET() { 
  try{  
    const ans = await prisma.paper.findMany()
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