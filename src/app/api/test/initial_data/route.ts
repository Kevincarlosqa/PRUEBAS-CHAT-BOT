import { badResponse, goodResponse } from "@/helpers/api/response";
import {
  answers_case01,
  answers_case02,
  answers_case03,
  answers_info,
  case01_info,
  case01_teeth,
  case02_info,
  case02_teeth,
  case03_info,
  case03_teeth,
  images_case01,
  images_case02,
  images_case03,
  papers_case01,
  papers_info,
  themes,
  themes_case01,
} from "@/helpers/db/initial_data";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    await prisma.question.deleteMany();
    await prisma.step.deleteMany();
    await prisma.user.deleteMany();
    await prisma.themesOnPapers.deleteMany();
    await prisma.themesOnCases.deleteMany();
    await prisma.answersOnCases.deleteMany();
    await prisma.caseTooth.deleteMany();
    await prisma.image.deleteMany();
    await prisma.case.deleteMany();
    await prisma.paper.deleteMany();
    await prisma.answer.deleteMany();
    await prisma.theme.deleteMany();

    await prisma.user.create({
      data: { id: "1573982513", name: "Carlos Test" },
    });

    await prisma.paper.createMany({ data: papers_info });
    await prisma.answer.createMany({ data: answers_info });
    await prisma.theme.createMany({ data: themes });

    const createCase = async (
      caseData: typeof case01_info,
      teeth: Array<(typeof case01_teeth)[number]>,
      images: Array<(typeof images_case01)[number]>,
      answers: Array<(typeof answers_case01)[number]>,
    ) => {
      const { id: caseId } = await prisma.case.create({ data: caseData });
      await prisma.caseTooth.createMany({
        data: teeth.map((item) => ({ ...item, caseId })),
      });
      const newImages = images.map((el) => ({ ...el, caseId }));
      await prisma.image.createMany({ data: newImages });
      const answerCases = await Promise.all(
        answers.map(async ({ isCorrect, name }) => {
          const vals = (await prisma.answer.findFirst({ where: { name } })) || {
            id: 0,
          };
          return { answerId: vals.id, isCorrect, caseId };
        }),
      );
      await prisma.answersOnCases.createMany({ data: answerCases });
      const caseThemes = await Promise.all(
        themes_case01.map(async ({ name }) => {
          const vals = (await prisma.theme.findFirst({ where: { name } })) || {
            id: 0,
          };
          return { themeId: vals.id, caseId };
        }),
      );
      await prisma.themesOnCases.createMany({ data: caseThemes });
      return caseId;
    };

    await createCase(case01_info, case01_teeth, images_case01, answers_case01);
    await createCase(case02_info, case02_teeth, images_case02, answers_case02);
    await createCase(case03_info, case03_teeth, images_case03, answers_case03);

    const theme = await prisma.theme.findFirst({
      where: { name: themes_case01[0].name },
    });
    if (theme) {
      const themePapers = await Promise.all(
        papers_case01.map(async ({ title }) => {
          const vals = await prisma.paper.findFirst({ where: { title } });
          if (!vals) throw new Error("no se encontro");
          return { themeId: theme.id, paperId: vals.id };
        }),
      );
      await prisma.themesOnPapers.createMany({
        data: themePapers,
        skipDuplicates: true,
      });
    }

    return goodResponse("Se creó correctamente");
  } catch (error) {
    return badResponse({ error });
  }
}
