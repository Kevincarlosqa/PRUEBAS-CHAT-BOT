import { prisma } from '@/helpers/prisma';
import { DB_Topic } from '@/types/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

/*
  body = {
    nombre: string
  }
*/
export const INDICE_TEMAS = [
  'Tema 01', // id: 01
  'Tema 02', // id: 02
  'Tema 03', // id: 03
  'Tema 04', // id: 04
  'Tema 05', // id: 05
  '', // id: 06 ___ INACTIVO
  '', // id: 07 ___ INACTIVO
  '', // id: 08 ___ INACTIVO
  '', // id: 09 ___ INACTIVO
  '', // id: 10 ___ INACTIVO
  '', // id: 11 ___ INACTIVO
  '', // id: 12 ___ INACTIVO
  '', // id: 13 ___ INACTIVO
  '', // id: 14 ___ INACTIVO
  '', // id: 15 ___ INACTIVO
]



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req
  if(method != 'GET') return res.status(400).json({error: 'Only get method'})
  
  try{
    const model = prisma.topic

    const topicsDB = await model.findMany();
    const topics = topicsDB.map(el => el.name)

    const data:DB_Topic[] = []

    for(let i=0; i<INDICE_TEMAS.length; i++){
      const name = INDICE_TEMAS[i]
      if(topics.includes(name) || !name) continue

      data.push({id:i+1,name})
    }

    await model.createMany({data})

    return res.status(200).json({msg:'Created Succesfully'})
  }catch(err){
    return res.status(400).json(err)
  }
}
