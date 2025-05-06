import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

/*
  body = {
    title: string,
    ante: string,
    exam: string,
    topics: number[]
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
    const {title,ante,exam,topics,ans} = body
    if(!title || !ante || !exam || !topics || !ans) return res.status(400).json({error:'Bad body structure'})
    
    const create = topics.map((id:number) => ({topic: {connect:{id}}}))
    const data = {
      title,ante,exam,ans,
      topics: { create }
    }

    const {id} = await prisma.dentalCase.create({data})

    return res.status(200).json({msg:'Case added Succesfully',id})
  }catch(err){
    return res.status(400).json(err)
  }

}
