import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';


/*
  body = {
    biblio: number,
    vectors: vector[],
  }
*/



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {biblio,vectors} = body
    if(!biblio || !vectors ) return res.status(400).json({error:'Bad body structure'})
    
    const embSQL = vectors.map( (vec:number[]) => `(${biblio}, '[${vec.join(',')}]')`).join(',')

    await prisma.$executeRawUnsafe(`INSERT INTO "Embedding" ("biblio_id","vector") VALUES ${embSQL}`)

    return res.status(200).json({msg:'Vectors added Succesfully'})
  }catch(err){
    return res.status(400).json(err)
  }

}
