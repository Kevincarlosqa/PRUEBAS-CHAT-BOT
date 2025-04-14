import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

/*
  body = {
    title: string,
    ante: string,
    exam: string,
    temas: number[]
    ans: string,
  }
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {title,ante,exam,temas,ans} = body
    if(!title || !ante || !exam || !temas || !ans) return res.status(400).json({error:'Bad body structure'})
    
    const create = temas.map((id:number) => ({tema: {connect:{id}}}))
    const data = {
      title,ante,exam,ans,
      temas: { create }
    }

    const {id} = await prisma.case.create({data})

    return res.status(200).json({msg:'Case added Succesfully',id})
  }catch(err){
    return res.status(400).json(err)
  }

}
