import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

/*
  body = {
    title: string,
    autor: string,
    temas: number[]
  }
*/



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {title,autor,temas} = body
    if(!title || !autor || !temas) return res.status(400).json({error:'Bad body structure'})

    const exist = await prisma.biblio.findFirst({where:{title}})
    if(exist) return res.status(400).json({error:'value Exist'})

    
    const create = temas.map((id:number) => ({tema: {connect:{id}}}))
    const data = {
      title, autor,
      temas: { create }
    }

    const {id} = await prisma.biblio.create({data})

    return res.status(200).json({msg:'Biblio added Succesfully',id})
  }catch(err){
    return res.status(400).json(err)
  }

}
