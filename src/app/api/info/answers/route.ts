import { badResponse, goodResponse } from '@/helpers/api/response';
import { basic_table } from '@/helpers/types/api';
import { prisma } from '@/lib/prisma';



//* GET: Obtener todos las opciones de respuesta
// return {id,name}[]
  export async function GET() { 
    try{  
      const ans = await prisma.answer.findMany()
      return goodResponse('Opciones de diagnostico',ans)
    }catch(err){
      return badResponse({err})
    }
  }

//* POST: Agregar una lista de respuestas
// body = string[]
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


//* PUT: Cambiar el valor de una respuesta
// body = {id,name:newName}
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