import { prisma } from "@/lib/prisma";
import {
  Bot_sendKeyboard,
  Bot_sendMsg,
  Bot_sendMsgBadChoice,
  Bot_sendPhoto,
} from "../api/message";
import { errorResponse } from "../api/response";
import { stage_data } from "../types/stages";
import { updateStage, updateStep } from "./helpers";
import { stage_04 } from "./stage_04";
import { stage_11 } from "./stage_11";

//* MENU MAS INFORMACION
const options = [
  "Antecedentes",
  "Historia de Progrecion",
  "Dolencia",
  "Radiografias clinicas",
  "Fotografias clinicas",
  "Consultar Bibliografia",
  "Dar respuesta",
];
const len = options.length - 1;

export const stage_09 = async (inputInfo: stage_data) => {
  const { userId, botIndex, id, caseId, selectedTooth } = inputInfo;
  const text = selectedTooth
    ? `Perfecto. Sigamos con la pieza ${selectedTooth}. Elige qué información deseas revisar.`
    : "Primero elige la pieza dental para revisar información específica.";

  try {
    if (!caseId) return;

    const teeth = await prisma.caseTooth.findMany({
      where: { caseId },
      select: { toothNumber: true },
    });
    const toothOptions = teeth
      .map((item: { toothNumber: string }) => item.toothNumber)
      .filter(Boolean) as string[];

    if (!selectedTooth && toothOptions.length > 0) {
      await Bot_sendKeyboard(
        "¿De qué pieza dental necesitas más información?",
        userId,
        botIndex,
        toothOptions,
      );
      await updateStage(id, 5);
      return;
    }

    await Bot_sendKeyboard(text, userId, botIndex, options);
    await updateStage(id, 5);
  } catch {
    errorResponse(`Error en el stage09`, inputInfo);
  }
};

//* RESPUESTA AL MENU MAS INFORMACION

export const stage_10 = async (inputInfo: stage_data) => {
  const { input, userId, botIndex, caseId, id, selectedTooth } = inputInfo;
  const choice = options.indexOf(input);

  if (!caseId) return console.log("CaseId null en stage_10");

  const select = choice === 3; // si es true son radiografias
  try {
    const teeth = await prisma.caseTooth.findMany({
      where: { caseId },
      select: {
        toothNumber: true,
        clinicalExam: true,
        detailSummary: true,
        correctDiagnosis: true,
      },
    });
    const toothSelection = teeth.find(
      (item: { toothNumber: string }) => item.toothNumber === input,
    );

    if (toothSelection) {
      await updateStep(id, { selectedTooth: input });
      const text = `📌 Pieza ${input}\n\nExamen clínico: ${toothSelection.clinicalExam}\n\nResumen: ${toothSelection.detailSummary}\n\nDiagnóstico esperado: ${toothSelection.correctDiagnosis}`;
      await Bot_sendMsg(text, userId, botIndex);
      return await stage_09({ ...inputInfo, selectedTooth: input });
    }

    if (select || choice === 4) {
      const where = selectedTooth
        ? { caseId, type: select, toothNumber: selectedTooth }
        : { caseId, type: select };
      const list = await prisma.image.findMany({ where });

      if (list.length === 0) {
        const tipoImg = select ? "Radiografias" : "Fotografias";
        await Bot_sendMsg(
          `No hay ${tipoImg} para esta pieza en este caso`,
          userId,
          botIndex,
        );
        return stage_09(inputInfo);
      }

      for (const el of list) {
        const { url, info } = el;
        await Bot_sendMsg(info, userId, botIndex);
        await Bot_sendPhoto(url, userId, botIndex);
      }

      return stage_09(inputInfo);
    }

    if (choice === len) return await stage_04(inputInfo); // menu dar respuersta

    if (choice === len - 1) return await stage_11(inputInfo); // menu de consulta bibliografica

    if (choice === -1) {
      // Respuesta invalida
      await Bot_sendMsgBadChoice(userId, botIndex);
      return await stage_09(inputInfo);
    }

    if (
      !selectedTooth &&
      choice !== -1 &&
      choice !== len &&
      choice !== len - 1
    ) {
      await Bot_sendMsg(
        "Primero selecciona una pieza dental para revisar la información específica.",
        userId,
        botIndex,
      );
      return await stage_09(inputInfo);
    }

    const { background, history, pain } = (await prisma.case.findFirst({
      where: { id: caseId },
    })) || { background: "", history: "", pain: "" };

    if (choice === 0)
      await Bot_sendMsg(
        `Antecedentes del caso:\n${background}`,
        userId,
        botIndex,
      ); // Enviar antecedentes

    if (choice === 1)
      await Bot_sendMsg(
        `Historia de progresión:\n${history}`,
        userId,
        botIndex,
      ); // enviar historial

    if (choice === 2) await Bot_sendMsg(`Dolencia:\n${pain}`, userId, botIndex); // enviar dolor :C

    await stage_09(inputInfo);
  } catch {
    errorResponse(`Error en el stage10`, inputInfo);
  }
};
