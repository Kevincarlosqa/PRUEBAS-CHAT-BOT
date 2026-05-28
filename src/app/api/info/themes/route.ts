import { badResponse, goodResponse } from '@/helpers/api/response';
import { basic_table } from '@/helpers/types/api';
import { prisma } from '@/lib/prisma';


//* GET: Obtener todos los temas 
// return {id,name}[]
export async function GET() { 
  try{  
    const ans = await prisma.theme.findMany()
    return goodResponse('Opciones de diagnostico',ans)
  }catch(err){
    return badResponse({err})
  }
}

//* POST: Agregar tema
// body = {name,botIndex}

interface BodyPostTheme {
  name: string,
  botIndex: number
}
export async function POST(request:Request){
  try{
    const data:BodyPostTheme = await request.json()

    await prisma.theme.create({data})

    return goodResponse('Tema subido correctamente')
  }catch(err){
    return badResponse({err})
  }
}

//* PUT: Cambiar el nombre de un tema
// body = {id,name:newName}
  export async function PUT(request:Request){
    try{
      const body:basic_table = await request.json()
      const {id,name} = body

      await prisma.theme.update({where:{id},data:{name}})

      return goodResponse(`Respuesta actualizada correctamente`)
    }catch(err){
      return badResponse({err})
    }
  }
