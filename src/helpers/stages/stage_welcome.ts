import { useId } from "react";
import { Bot_sendMsg } from "../api/message";
import { stage_data, welcome_data } from "../types/stages";
import { createStep } from "./helpers";
import { stage_start } from "./stage_start";
import { consoleError, errorResponse } from "../api/response";
import { prisma } from "@/lib/prisma";

const mess = (
  msg: string,
  tema: string,
) => `Bienvenido ${msg} al entorno de entrenamiento clínico ${tema}.

Este espacio está diseñado para que puedas analizar casos odontológicos reales con enfoque profesional. Aquí recibirás información estructurada, guías de interpretación y herramientas para decidir con criterio clínico.

Cuando estés listo, continúa escribiendo cualquier mensaje para iniciar el caso y comenzar la evaluación.`;

export const stage_welcome = async (inputInfo: welcome_data) => {
  const { userId, userName, botIndex } = inputInfo;

  try {
    const { id: themeId, name } = (await prisma.theme.findFirst({
      where: { botIndex },
    })) || { id: 0, name: "" };

    const text = mess(userName, name);

    await Bot_sendMsg(text, userId, botIndex);
    await createStep(userId, themeId);

    const data = {
      userId,
      userName,
      botIndex,
      themeId,
      id: 0,
      input: "",
      errors: 0,
      caseId: 0,
      paperId: 0,
      stage: 0,
    };

    await stage_start(data);
  } catch (err) {
    consoleError(err);
    errorResponse(`Error en stage welcome`, inputInfo);
  }
};
