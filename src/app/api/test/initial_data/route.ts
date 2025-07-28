import { badResponse, goodResponse } from '@/helpers/api/response'
import { answers_case01, answers_info, case01_info, images_case01, papers_case01, papers_info, themes, themes_case01 } from '@/helpers/db/initial_data'
import { prisma } from '@/helpers/db/prisma'

export async function GET(request: Request) { 
  try {
    // Bibliografia
      await prisma.paper.deleteMany()
      await prisma.paper.createMany({data: papers_info})
    
    // Respuestas
      await prisma.answer.deleteMany()
      await prisma.answer.createMany({data:answers_info})

    // Temas
      await prisma.theme.deleteMany()
      await prisma.theme.createMany({data:themes})
      
    // Casos
      await prisma.case.deleteMany()
      const { id:caseId } = await prisma.case.create({data:case01_info})

    // Imagenes
      await prisma.image.deleteMany()
      const images = images_case01.map( el => ({...el,caseId}))
      await prisma.image.createMany({data:images})

    // Respuestas por caso
      await prisma.answersOnCases.deleteMany()
      const hola03 = await Promise.all(answers_case01.map(async ({isCorrect,name}) => {
        const vals = await prisma.answer.findFirst({where:{name}}) || {id:0}
        return {answerId: vals.id, isCorrect, caseId}
      }))
      await prisma.answersOnCases.createMany({data:hola03})

    // Temas por caso
      await prisma.themesOnCases.deleteMany()
      const hola04 = await Promise.all(themes_case01.map(async ({name}) => {
        const vals = await prisma.theme.findFirst({where:{name}}) || {id:0}
        return {themeId:vals.id,caseId}
      }))
      await prisma.themesOnCases.createMany({data:hola04})

    // Bibliografia por caso
      await prisma.themesOnPapers.deleteMany()
      const themeId = hola04[0].themeId
      const hola05 = await Promise.all(papers_case01.map(async ({title}) => {
        const vals = await prisma.paper.findFirst({where:{title}}) || {id:0}
        return {themeId,paperId:vals.id}
      }))
      await prisma.themesOnPapers.createMany({data:hola05})


    return goodResponse('Se creó correctamente')

  } catch (error) {
    return badResponse({error})
  }
}