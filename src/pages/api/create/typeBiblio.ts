import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';


/*
  body = {
    name: string
  }
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {name} = body
    if(!name) return res.status(400).json({error:'Bad body structure'})

    const data = {
      name
    }
    await prisma.typeBiblio.create({data})
    return res.status(200).json({msg:'Created Succesfully'})
  }catch(err){
    return res.status(400).json(err)
  }

}
