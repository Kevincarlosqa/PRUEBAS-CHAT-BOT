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
  exam: "Paciente de 8 años y 6 meses con lesiones cavitadas en piezas 74 y 75. La pieza 74 presenta lesión oclusal en dentina con aspecto blando. La pieza 75 presenta lesión profunda con dolor espontáneo prolongado.",
  history:
    "Dolor espontáneo de 3 semanas en el sector inferior izquierdo. La madre reporta molestias persistentes y ausencia de mejoría.",
  background:
    "Paciente sin antecedentes patológicos relevantes. Higiene oral deficiente, bruxismo leve y onicofagia. Acude con su madre en un estado general estable.",
  work: "Analiza los hallazgos clínicos y radiográficos para determinar el diagnóstico pulpar de las piezas 74 y 75.",
  pain: "Dolor espontáneo de intensidad fuerte en la pieza 75, con mayor molestia durante la noche.",
};

export const case01_teeth = [
  {
    toothNumber: "74",
    clinicalExam:
      "Lesión cavitada oclusal, color marrón, consistencia blanda y extensión aparente hacia dentina. Asintomático.",
    radiographicNotes:
      "Radiolúcido oclusal en ECP/R5, con profundidad estimada 1/3.",
    radiographicDepth: "1/3",
    rootResorption: "1/3",
    correctDiagnosis: "Necrosis pulpar",
    detailSummary:
      "La pieza 74 evidencia compromiso pulpar crónico sin signos claros de inflamación aguda.",
  },
  {
    toothNumber: "75",
    clinicalExam:
      "Lesión cavitada oclusal marrón, consistencia blanda y dolor espontáneo desde hace 3 semanas.",
    radiographicNotes:
      "Radiolúcido oclusal en ACP, con compromiso pulpar evidente.",
    radiographicDepth: "1/3",
    rootResorption: "1/3",
    correctDiagnosis: "Pulpitis irreversible",
    detailSummary:
      "La pieza 75 presenta inflamación pulpar activa y hallazgos radiográficos compatibles con daño irreversible.",
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
  exam: "Paciente de 7 años con cavidades en piezas 55 y 65. La pieza 55 evidencia compromiso de esmalte y dentina; la pieza 65 presenta extensión profunda y dolor súbito.",
  history:
    "La madre describe sensibilidad al empaquetamiento de alimentos en 55 y dolor repentino en 65, con evolución progresiva.",
  background:
    "Higiene oral sin supervisión, con antecedentes de extracciones y tratamientos de flúor. El paciente consume alimentos cariogénicos con frecuencia.",
  work: "Determina el diagnóstico pulpar para las piezas 55 y 65 y el manejo recomendado.",
  pain: "Dolor localizado al empaquetamiento en 55 y episodios de dolor agudo en 65.",
};

export const case02_teeth = [
  {
    toothNumber: "55",
    clinicalExam:
      "Lesión cavitada oclusomesial, consistencia blanda, halo blanquecino y compromiso de esmalte y dentina. Sintomático al empaquetamiento.",
    radiographicNotes:
      "Radiolúcido oclusomesial con desarrollo hacia PAP, profundidad 2/3.",
    radiographicDepth: "2/3",
    rootResorption: "2/3",
    correctDiagnosis: "Pulpitis reversible",
    detailSummary:
      "La pieza 55 mantiene lesión inflamatoria pulpar leve con posibilidad de tratamiento conservador.",
  },
  {
    toothNumber: "65",
    clinicalExam:
      "Lesión cavitada oclusomesial con extensión a esmalte y dentina, consistencia blanda.",
    radiographicNotes: "Radiolúcido oclusomesial en ACP, profundidad 2/3.",
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
  exam: "Niña de 4 años 11 meses con lesiones visibles en piezas superiores y dolor localizado en 74. Se identifica pólipo pulpar y fístula en 54.",
  history:
    "Evolución progresiva de caries visibles en múltiples piezas, con molestia a la palpación en 74.",
  background:
    "Buena higiene supervisada. Antecedentes de alopecia infantil y succión digital ocasional. Conducta colaboradora.",
  work: "Evalúa el diagnóstico pulpar en piezas 54 y 74 para establecer el manejo pulpar ideal.",
  pain: "Dolor a la palpación en la pieza 74, sin dolor espontáneo generalizado.",
};

export const case03_teeth = [
  {
    toothNumber: "54",
    clinicalExam:
      "Lesión cavitada oclusal con pólipo pulpar y fístula presente.",
    radiographicNotes: "Radiolúcido oclusal en ECP, profundidad 2/3.",
    radiographicDepth: "2/3",
    rootResorption: "2/3",
    correctDiagnosis: "Periodontitis apical crónica",
    detailSummary:
      "La pieza 54 presenta proceso apical crónico con comunicación fistulosa.",
  },
  {
    toothNumber: "74",
    clinicalExam:
      "Lesión cavitada oclusal profunda, coloración negruzca y dolor a la exploración.",
    radiographicNotes: "Radiolúcido oclusodistal en PAP, profundidad 1/3.",
    radiographicDepth: "1/3",
    rootResorption: "1/3",
    correctDiagnosis: "Pulpitis reversible",
    detailSummary:
      "La pieza 74 evidencia compromiso pulpar leve con posibilidad de tratamiento conservador.",
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
