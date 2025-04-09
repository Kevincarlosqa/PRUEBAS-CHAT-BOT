import { prisma } from '@/helpers/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

// 01(radiografia)
// 02(fotografia)

/*
  body = {
    case_id: number,
    info: {url:string, tipo: 1 | 2}[]
  }
*/



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {case_id,info} = body
    if(!case_id || !info) return res.status(400).json({error:'Bad body structure'})
    
    const case_exist = await prisma.case.findUnique({where:{id:case_id}})
    if(!case_exist) return res.status(400).json({error:'That case no exist'})

    const data = {
      images: {
        create: info
      }
    } 
    const where = {id:case_id}

    await prisma.case.update({where,data})
    return res.status(200).json({msg:'Images save succesfully'})
  }catch(err){
    return res.status(400).json(err)
  }
}
