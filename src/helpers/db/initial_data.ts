import { intAnswers, intCases, intImages, intPapers } from "../types/models";

export const papers_info = [
  {
    title: "Fundamentos Avanzados de Endodoncia",
    autor: "Dr. Ricardo Montalvo",
  },
  {
    title: "Radiología Odontológica: Interpretación y Diagnóstico",
    autor: "Dra. Sofía Ledesma",
  },
  {
    title: "Odontología Pediátrica: Manejo Integral del Paciente Joven",
    autor: "Dra. Elena Salgado",
  },
];

export const answers_info = [
  { name: "Pulpitis reversible" },
  { name: "Pulpitis irreversible" },
  { name: "Necrosis pulpar" },
  { name: "Periodontitis apical crónica" },
  { name: "Absceso periapical" },
  { name: "Pulpotomía indicada" },
  { name: "Pulpectomía indicada" },
];

export const case01_info = {
  title: "Caso Clínico N° 1 - Mitzi Callalli",
  exam: "Paciente de 8 años y 6 meses acude a consulta en compañía de su madre. No presenta antecedentes patológicos familiares y personales de relevancia. Se observa presencia de lesiones cavitadas en zona inferior del lado izquierdo, en piezas 74 y 75.",
  history:
    "Paciente acude por presentar dolor espontáneo de intensidad fuerte y duración prolongada en diente del sector inferior lado izquierdo desde hace 3 semanas. La madre reporta molestias persistentes y ausencia de mejoría.",
  background:
    "Tuvo lactancia materna de 0 a 3 años y artificial de 3 a 8 años. Respecto a la higiene oral, se cepilla 1 vez al día sin supervisión de los padres, no refiere utilizar hilo dental ni enjuagatorios. Suele rechinar ligeramente los dientes en ocasiones por aprox. 5 a 6 minutos y regularmente suele comerse las uñas cuando está nervioso aprox. 5 minutos.",
  work: "Analiza los hallazgos clínicos y radiográficos para determinar el diagnóstico pulpar de las piezas 74 y 75.",
  pain: "Dolor espontáneo de intensidad fuerte y duración prolongada en diente del sector inferior lado izquierdo desde hace 3 semanas.",
};

export const case01_teeth = [
  {
    toothNumber: "74",
    clinicalExam:
      "Lesión cavitada en superficie oclusal de color marrón, de consistencia blanda, y con aparente extensión hacia dentina, asintomático.",
    radiographicNotes:
      "Radiolúcido oclusal en ECP/R5, con profundidad estimada 1/3. Hallazgos compatibles con compromiso pulpar crónico.",
    radiographicDepth: "1/3",
    rootResorption: "1/3",
    correctDiagnosis: "Necrosis pulpar",
    detailSummary:
      "La pieza 74 evidencia compromiso pulpar crónico sin signos claros de inflamación aguda.",
  },
  {
    toothNumber: "75",
    clinicalExam:
      "Lesión cavitada en superficie oclusal de color marrón, de consistencia blanda, y con aparente extensión hacia dentina, dolor espontáneo desde hace 3 semanas.",
    radiographicNotes:
      "Radiolúcido oclusal en ACP, con compromiso pulpar evidente. Profundidad 1/3.",
    radiographicDepth: "1/3",
    rootResorption: "1/3",
    correctDiagnosis: "Pulpitis irreversible",
    detailSummary:
      "La pieza 75 presenta inflamación pulpar activa con dolor espontáneo prolongado y hallazgos radiográficos compatibles con daño irreversible.",
  },
];

export const images_case01 = [
  {
    url: "https://i.ibb.co/4nBw9Xqr/74chatradio.png",
    title: "Radiografía pieza 74",
    caption:
      "Radiografía que muestra el sector inferior izquierdo y hallazgos de la pieza 74.",
    info: "La pieza 74 presenta un radiolúcido oclusal compatible con compromiso pulpar crónico.",
    type: true,
    toothNumber: "74",
  },
  {
    url: "https://i.ibb.co/Z1wW904z/74chat.png",
    title: "Fotografía clínica pieza 74",
    caption:
      "Imagen del sector inferior izquierdo con cavidad oclusal en la pieza 74.",
    info: "La fotografía muestra el color y la cavidad de la pieza 74 sin signos de absceso evidente.",
    type: false,
    toothNumber: "74",
  },
  {
    url: "https://i.ibb.co/m5HkW0YB/75chatradio.png",
    title: "Radiografía pieza 75",
    caption:
      "Radiografía que muestra compromiso pulpar profundo en la pieza 75.",
    info: "La pieza 75 evidencia lesión radiolúcida apical y daño pulpar claro.",
    type: true,
    toothNumber: "75",
  },
  {
    url: "https://i.ibb.co/Z1wW904z/74chat.png",
    title: "Fotografía clínica pieza 75",
    caption: "Imagen de la pieza 75 con cavidad profunda en oclusal.",
    info: "La fotografía muestra cavidad profunda y posibles signos clínicos de compromiso pulpar.",
    type: false,
    toothNumber: "75",
  },
];

export const answers_case01 = [
  { name: "Necrosis pulpar", isCorrect: true },
  { name: "Pulpitis irreversible", isCorrect: true },
  { name: "Absceso periapical", isCorrect: false },
  { name: "Pulpectomía indicada", isCorrect: false },
];

export const case02_info = {
  title: "Caso Clínico N° 2 - Joselyn Chapoñán",
  exam: "Paciente masculino de 7 años acude a consulta acompañado de su madre. Se observan cavidades en diferentes piezas dentales y fractura de corona de pieza 64. Presenta sintomatología al empaquetamiento de alimentos en piezas 55 y dolor que se presenta de pronto en pieza 65.",
  history:
    "La madre menciona que su niño tiene cavidades en diferentes piezas dentales y fractura de una pieza superior. Refiere que su niño manifiesta sintomatología al empaquetamiento de alimentos en piezas 55 y dolor que se presenta de pronto en pieza 65.",
  background:
    "En la etapa prenatal la madre consumió ácido fólico y calcio. No refiere enfermedades en la infancia. Con respecto a los antecedentes familiares, los abuelos padecen de hipertensión. Paciente se cepilla 2 veces al día sin supervisión. Tiene como hábito nocivo: interposición lingual. Anteriormente se le han realizado los siguientes tratamientos odontológicos: extracción, limpieza y flúor.",
  work: "Determina el diagnóstico pulpar para las piezas 55 y 65 y el manejo recomendado.",
  pain: "Sintomatología al empaquetamiento de alimentos en piezas 55 y dolor que se presenta de pronto en pieza 65.",
};

export const case02_teeth = [
  {
    toothNumber: "55",
    clinicalExam:
      "Lesión cavitada en ocluso mesial, de consistencia blanda. Con halo blanquecino. Con compromiso de esmalte y dentina. Sintomático al empaquetamiento de comida.",
    radiographicNotes:
      "Radiolúcido oclusomesial en PAP, con profundidad estimada 2/3.",
    radiographicDepth: "2/3",
    rootResorption: "2/3",
    correctDiagnosis: "Pulpitis reversible",
    detailSummary:
      "La pieza 55 mantiene lesión inflamatoria pulpar leve con posibilidad de tratamiento conservador.",
  },
  {
    toothNumber: "65",
    clinicalExam:
      "Lesión cavitada en cara ocluso mesial, con extensión a esmalte y dentina, de consistencia blanda.",
    radiographicNotes:
      "Radiolúcido oclusomesial en ACP, con profundidad estimada 2/3.",
    radiographicDepth: "2/3",
    rootResorption: "2/3",
    correctDiagnosis: "Pulpitis irreversible",
    detailSummary:
      "La pieza 65 muestra signos compatibles con inflamación pulpar irreversible.",
  },
];

export const images_case02 = [
  {
    url: "https://i.ibb.co/6JGqQT7T/radio65.png",
    title: "Radiografía pieza 65",
    caption: "Radiografía de la pieza 65 con lesión profunda.",
    info: "La radiografía evidencia compromiso dentinario y lesión pulpar en 65.",
    type: true,
    toothNumber: "65",
  },
  {
    url: "https://i.ibb.co/wrdr6sgw/foto65.png",
    title: "Fotografía clínica pieza 65",
    caption:
      "Imagen clínica de la pieza 65 con cavidad profunda y signos inflamatorios.",
    info: "La pieza 65 presenta inflamación visible y cambios de coloración asociados a dolor espontáneo.",
    type: false,
    toothNumber: "65",
  },
  {
    url: "https://i.ibb.co/tTvwdLh0/radio55.png",
    title: "Radiografía pieza 55",
    caption:
      "Radiografía de la pieza 55 con lesión oclusomesial en esmalte y dentina.",
    info: "La imagen muestra un compromiso pulpar leve con posible tratamiento conservador.",
    type: true,
    toothNumber: "55",
  },
  {
    url: "https://i.ibb.co/hRpGrbyT/foto55.png",
    title: "Fotografía pieza 55",
    caption: "Imagen clínica de la pieza 55 con cavidad oclusomesial.",
    info: "La pieza 55 muestra lesión blanda con halo blanquecino.",
    type: false,
    toothNumber: "55",
  },
];

export const answers_case02 = [
  { name: "Pulpitis reversible", isCorrect: true },
  { name: "Pulpitis irreversible", isCorrect: true },
  { name: "Pulpectomía indicada", isCorrect: false },
  { name: "Absceso periapical", isCorrect: false },
];

export const case03_info = {
  title: "Caso Clínico N° 3 - Angelina Vanessa Chico",
  exam: "Paciente de 4 años 11 meses de edad, clasificada como infante colaborador. Durante el periodo prenatal, la madre consumió ácido fólico. El parto fue por cesárea y el nacimiento ocurrió a término. Se observan lesiones cariosas cavitadas en superficies oclusales de los molares superiores.",
  history:
    "La enfermedad actual ha tenido una evolución progresiva. Se observa presencia de caries visibles en múltiples piezas dentales. La paciente se encuentra asintomática en la mayoría de las piezas dentales. Sin embargo, durante la exploración clínica se identificó dolor a la palpación o percusión en la pieza 74. No se reporta dolor espontáneo en otras localizaciones.",
  background:
    "La lactancia materna se prolongó por 1 año y 4 meses, continuando posteriormente con lactancia artificial durante 11 meses, sin adición de endulzantes. Como antecedente patológico, la paciente presentó alopecia a los 3 años, sin que se haya registrado un diagnóstico específico. Refiere succión digital poco frecuente. La higiene oral es realizada por los padres tres veces al día con supervisión. La conducta de la paciente se clasifica como Frankl tipo 3 (positiva).",
  work: "Evalúa el diagnóstico pulpar en piezas 54 y 74 para establecer el manejo pulpar ideal.",
  pain: "Dolor a la palpación en la pieza 74, sin dolor espontáneo en otras localizaciones.",
};

export const case03_teeth = [
  {
    toothNumber: "54",
    clinicalExam:
      "Lesión cavitada en oclusal, presencia de pólipo pulpar. Se observa presencia de fístula.",
    radiographicNotes:
      "Radiolúcido oclusal en ECP, con profundidad estimada 2/3.",
    radiographicDepth: "2/3",
    rootResorption: "2/3",
    correctDiagnosis: "Periodontitis apical crónica",
    detailSummary:
      "La pieza 54 presenta proceso apical crónico con comunicación fistulosa y pólipo pulpar.",
  },
  {
    toothNumber: "74",
    clinicalExam:
      "Lesión cavitada en oclusal, a nivel de dentina profunda con aparente compromiso pulpar, textura blanda, coloración negruzca, dolor a la exploración.",
    radiographicNotes:
      "Radiolúcido oclusodistal en PAP, con profundidad estimada 1/3.",
    radiographicDepth: "1/3",
    rootResorption: "1/3",
    correctDiagnosis: "Pulpitis reversible",
    detailSummary:
      "La pieza 74 evidencia compromiso pulpar leve con dolor a la exploración y posibilidad de tratamiento conservador.",
  },
];

export const images_case03 = [
  {
    url: "https://i.ibb.co/ycF63NnC/radio54.png",
    title: "Radiografía pieza 54",
    caption: "Radiografía que sugiere periodontitis apical crónica en 54.",
    info: "La imagen muestra lesión apical en la pieza 54.",
    type: true,
    toothNumber: "54",
  },
  {
    url: "https://i.ibb.co/gbyPS42t/foto54.png",
    title: "Fotografía pieza 54",
    caption: "Imagen clínica de la pieza 54 con pólipo pulpar y fístula.",
    info: "La pieza 54 presenta signos de inflamación crónica y fístula activa.",
    type: false,
    toothNumber: "54",
  },
  {
    url: "https://i.ibb.co/7J84WFpw/foto74.png",
    title: "Fotografía pieza 74",
    caption: "Imagen clínica de la pieza 74 con cavidad profunda.",
    info: "La pieza 74 presenta daño pulpar leve-moderado con dolor a la exploración.",
    type: false,
    toothNumber: "74",
  },
  {
    url: "https://i.ibb.co/gLZpRG2T/radio74.png",
    title: "Radiografía pieza 74",
    caption:
      "Radiografía de la pieza 74 con lesión oclusal y radiolucidez leve.",
    info: "La pieza 74 muestra compromiso pulpar leve compatible con pulpitis reversible.",
    type: true,
    toothNumber: "74",
  },
];

export const answers_case03 = [
  { name: "Periodontitis apical crónica", isCorrect: true },
  { name: "Pulpitis reversible", isCorrect: true },
  { name: "Necrosis pulpar", isCorrect: false },
  { name: "Pulpectomía indicada", isCorrect: false },
];

export const themes = [
  {
    name: "Chatbot de competencias diagnósticas en terapia pulpar",
    botIndex: 1,
  },
];

export const themes_case01 = [
  {
    name: "Chatbot de competencias diagnósticas en terapia pulpar",
  },
];

export const papers_case01 = [
  { title: "Fundamentos Avanzados de Endodoncia" },
  { title: "Radiología Odontológica: Interpretación y Diagnóstico" },
  { title: "Odontología Pediátrica: Manejo Integral del Paciente Joven" },
];
