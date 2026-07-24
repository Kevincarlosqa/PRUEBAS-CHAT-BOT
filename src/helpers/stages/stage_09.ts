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
const OPTION_ANCECDENTES = "📝 Antecedentes";
const OPTION_HISTORY = "📖 Historia de progresión";
const OPTION_PAIN = "⚠️ Dolencia";
const OPTION_XRAY = "🦷 Ver radiografías";
const OPTION_PHOTO = "📸 Ver fotografías";
const OPTION_BIBLIO = "📚 Consultar bibliografía";
const OPTION_ANSWER = "✅ Dar respuesta";
const OPTION_CHANGE_TOOTH = "🔁 Cambiar pieza";

const options = [
  OPTION_ANCECDENTES,
  OPTION_HISTORY,
  OPTION_PAIN,
  OPTION_XRAY,
  OPTION_PHOTO,
  OPTION_BIBLIO,
  OPTION_ANSWER,
  OPTION_CHANGE_TOOTH,
];

export const stage_09 = async (inputInfo: stage_data) => {
  const { userId, botIndex, id, caseId, selectedTooth } = inputInfo;
  const text = selectedTooth
    ? `🔎 Estás revisando la pieza ${selectedTooth}. Elige la información que deseas analizar o selecciona '🔁 Cambiar pieza' para trabajar con otra pieza.`
    : "🔎 Selecciona la pieza dental que quieres revisar para continuar con el análisis clínico.";

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
        "🦷 Elige la pieza dental que deseas evaluar:",
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

  if (!caseId) return console.log("CaseId null en stage_10");

  try {
    const teeth = await prisma.caseTooth.findMany({
      where: { caseId },
      select: {
        toothNumber: true,
        clinicalExam: true,
        correctDiagnosis: true,
        pain: true,
      },
    });

    const toothSelection = teeth.find(
      (item: { toothNumber: string }) => item.toothNumber === input,
    );

    if (toothSelection) {
      await updateStep(id, { selectedTooth: input });
      const text = `📌 Pieza ${input}\n\nExamen clínico: ${toothSelection.clinicalExam}`;
      await Bot_sendMsg(text, userId, botIndex);
      return await stage_09({ ...inputInfo, selectedTooth: input });
    }

    if (input === OPTION_CHANGE_TOOTH) {
      await updateStep(id, { selectedTooth: null });
      return await stage_09({ ...inputInfo, selectedTooth: undefined });
    }

    if ((input === OPTION_XRAY || input === OPTION_PHOTO) && !selectedTooth) {
      await Bot_sendMsg(
        "Primero selecciona la pieza dental que quieres revisar. Luego podrás ver las imágenes clínicas correspondientes.",
        userId,
        botIndex,
      );
      return await stage_09(inputInfo);
    }

    if (input === OPTION_XRAY || input === OPTION_PHOTO) {
      const imageType = input === OPTION_XRAY;
      const where = {
        caseId,
        type: imageType,
        toothNumber: selectedTooth || undefined,
      };
      const list = await prisma.image.findMany({ where });

      if (list.length === 0) {
        const tipoImg = imageType ? "radiografías" : "fotografías";
        await Bot_sendMsg(
          `No se encontraron ${tipoImg} para la pieza seleccionada. Usa 🔁 Cambiar pieza para elegir otra o revisa otra opción del menú.`,
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

    if (input === OPTION_ANSWER) {
      if (!selectedTooth) {
        await Bot_sendMsg(
          "Debes seleccionar primero la pieza dental que quieres diagnosticar con ✅ Dar respuesta.",
          userId,
          botIndex,
        );
        return await stage_09(inputInfo);
      }
      return await stage_04(inputInfo);
    }

    if (input === OPTION_BIBLIO) return await stage_11(inputInfo);

    if ([OPTION_ANCECDENTES, OPTION_HISTORY, OPTION_PAIN].includes(input)) {
      const caseData =
        (await prisma.case.findFirst({ where: { id: caseId } })) ||
        ({ background: "", history: "", pain: "", exam: "" } as any);

      if (input === OPTION_ANCECDENTES) {
        const antecedentesText = `📋 ANTECEDENTES DEL CASO\n\n${caseData.background}\n\n📝 Examen General:\n${caseData.exam}`;
        await Bot_sendMsg(antecedentesText, userId, botIndex);
      }

      if (input === OPTION_HISTORY) {
        const historyText = `📈 HISTORIA DE PROGRESIÓN\n\n${caseData.history}`;
        await Bot_sendMsg(historyText, userId, botIndex);
      }

      if (input === OPTION_PAIN) {
        const toothPain = selectedTooth
          ? teeth.find(
              (item: { toothNumber: string }) =>
                item.toothNumber === selectedTooth,
            )?.pain
          : undefined;
        const painText = `😖 DOLENCIA Y PRESENTACIÓN CLÍNICA\n\n${toothPain ?? caseData.pain}`;
        await Bot_sendMsg(painText, userId, botIndex);
      }

      return stage_09(inputInfo);
    }

    await Bot_sendMsgBadChoice(userId, botIndex);
    return await stage_09(inputInfo);
  } catch {
    errorResponse(`Error en el stage10`, inputInfo);
  }
};
