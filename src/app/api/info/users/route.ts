import { badResponse, goodResponse } from "@/helpers/api/response";
import { prisma } from "@/helpers/db/prisma";


//* GET: Obtener todos los usuarios
export async function GET() {
  try{
    const users = await prisma.user.findMany()
    return goodResponse('Usuarios totales',users)
  }catch(err){
    return badResponse({err})
  }
}