import { badResponse, goodResponse } from '@/helpers/api/response';
import { prisma } from '@/helpers/db/prisma';
import { basic_table } from '@/helpers/types/api';


/**
 * Obtener todos las respuestas
 * Agregar respuestas
 * Editar respuestas
 */


// Obtener todos las opciones de respuesta
  export async function GET() { 
    try{  
      const ans = await prisma.answer.findMany()
      return goodResponse('Opciones de diagnostico',ans)
    }catch(err){
      return badResponse({err})
    }
  }

// Agregar una lista de respuestas
  export async function POST(request:Request){
    try{
      const body:string[] = await request.json()
      const data = body.map(el => ({name:el.toLowerCase()}))

      await prisma.answer.createMany({data,skipDuplicates:true})

      return goodResponse('Opciones subidas correctamente',data)
    }catch(err){
      return badResponse({err})
    }
  }


// Cambiar el valor de una respuesta
  export async function PUT(request:Request){
    try{
      const body:basic_table = await request.json()
      const {id,name} = body

      await prisma.answer.update({where:{id},data:{name}})

      return goodResponse(`Respuesta actualizada correctamente`)
    }catch(err){
      return badResponse({err})
    }
  }