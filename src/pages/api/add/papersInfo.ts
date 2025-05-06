import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

/*
  body = {
    title: string,
    autor: string,
    topics: number[]
  }
*/



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {title,autor,topics} = body
    if(!title || !autor || !topics) return res.status(400).json({error:'Bad body structure'})

    const exist = await prisma.info.findFirst({where:{title}})
    if(exist) return res.status(400).json({error:'value Exist'})

    
    const create = topics.map((id:number) => ({topic: {connect:{id}}}))
    const data = {
      title, autor,
      topics: { create }
    }

    const {id} = await prisma.info.create({data})

    return res.status(200).json({msg:'Information added Succesfully',id})
  }catch(err){
    return res.status(400).json(err)
  }

}
