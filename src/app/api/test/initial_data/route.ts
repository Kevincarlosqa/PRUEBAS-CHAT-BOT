import { badResponse, goodResponse } from "@/helpers/api/response";
import {
  answers_case01,
  answers_info,
  case01_info,
  images_case01,
  papers_case01,
  papers_info,
  themes,
  themes_case01,
} from "@/helpers/db/initial_data";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  // return goodResponse("Endpoint para cargar datos iniciales");
  
  try {
    const deletes = [
      prisma.paper.deleteMany(),
      prisma.answer.deleteMany(),
      prisma.theme.deleteMany(),
      prisma.case.deleteMany(),
      prisma.image.deleteMany(),
      prisma.answersOnCases.deleteMany(),
      prisma.themesOnCases.deleteMany(),
      prisma.themesOnPapers.deleteMany(),
    ];

    await Promise.all(deletes);
    // Usuarios
    await prisma.user.create({ data: { id: "1573982513", name: "Carlos Test" } });

    // Bibliografia
    await prisma.paper.createMany({ data: papers_info });

    // Respuestas
    await prisma.answer.createMany({ data: answers_info });

    // Temas
    await prisma.theme.createMany({ data: themes });

    // Casos
    const { id: caseId } = await prisma.case.create({ data: case01_info });

    // Imagenes
    const images = images_case01.map((el) => ({ ...el, caseId }));
    await prisma.image.createMany({ data: images });

    // Respuestas por caso
    const hola03 = await Promise.all(
      answers_case01.map(async ({ isCorrect, name }) => {
        const vals = (await prisma.answer.findFirst({ where: { name } })) || { id: 0 };
        return { answerId: vals.id, isCorrect, caseId };
      }),
    );
    await prisma.answersOnCases.createMany({ data: hola03 });

    // Temas por caso
    const hola04 = await Promise.all(
      themes_case01.map(async ({ name }) => {
        const vals = (await prisma.theme.findFirst({ where: { name } })) || { id: 0 };
        return { themeId: vals.id, caseId };
      }),
    );
    await prisma.themesOnCases.createMany({ data: hola04 });

    // Bibliografia por caso
    const themeId = hola04[0].themeId;
    const hola05 = await Promise.all(
      papers_case01.map(async ({ title }) => {
        const vals = await prisma.paper.findFirst({ where: { title } });
        if (!vals) throw new Error("no se encontro");
        return { themeId, paperId: vals.id };
      }),
    );
    await prisma.themesOnPapers.createMany({ data: hola05 });

    return goodResponse("Se creó correctamente");
  } catch (error) {
    return badResponse({ error });
  }
}
