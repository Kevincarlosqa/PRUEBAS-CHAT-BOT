import { prisma } from '@/helpers/prisma';
import { connect } from 'http2';
import type { NextApiRequest, NextApiResponse } from 'next';

// 01(radiografia)
// 02(fotografia)

/*
  body = {
    idCase: number,
    info: {url:string, tipo: 1 | 2,name}[]
  }
*/


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method,body} = req

  if(method != 'POST') return res.status(400).json({error: 'Only post method'})
  
  try{
    const {idCase,info} = body
    if(!idCase || !info) return res.status(400).json({error:'Bad body structure'})
    
    const id = +idCase

    const case_exist = await prisma.dentalCase.findUnique({where:{id}})
    if(!case_exist) return res.status(400).json({error:'That case no exist'})

    const allImages = info.map( (el:any) => 
      prisma.image.create({
        data:{
          type: el.tipo,
          url: el.url,
          name: el.name,
          dentalCase:{
            connect: {id}
          }
        }
      })
    )
    
    await Promise.all(allImages)

    return res.status(200).json({msg:'Images save succesfully'})
  }catch(err){
    return res.status(400).json(err)
  }
}
