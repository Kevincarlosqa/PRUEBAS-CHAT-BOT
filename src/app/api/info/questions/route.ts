import { badResponse, goodResponse } from "@/helpers/api/response";
import { prisma } from "@/lib/prisma";

//* GET: Consultas hechas entre determinadas fechas
// params {start:'m-d-a',end:'m-d-a'}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  const msg = "mala estructura del body";
  if (!start || !end) return badResponse({ msg });

  const startDate = new Date(start);
  const endDate = new Date(end);
  try {
    const ans = await prisma.question.findMany({
      where: { createdAt: { gte: startDate, lte: endDate } },
      include: { user: { select: { name: true } } },
    });

    return goodResponse("Consultas a la IA hechas por los usuarios", ans);
  } catch (err) {
    return badResponse({ err });
  }
}
