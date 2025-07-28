import { intAnswers, intCases, intImages, intPapers } from "../types/models"

export const papers_info =[
  { title: "Fundamentos Avanzados de Endodoncia", autor: "Dr. Ricardo Montalvo" },
  { title: "Prótesis Dental: Innovaciones y Técnicas", autor: "Dra. Valeria Guzmán" },
  { title: "Periodoncia Clínica y Cirugía Oral", autor: "Dr. Esteban Romero" },
  { title: "Radiología Odontológica: Interpretación y Diagnóstico", autor: "Dra. Sofía Ledesma" },
  { title: "Odontología Estética: Principios y Aplicaciones", autor: "Dr. Alejandro Paredes" },
  { title: "Biomecánica en Ortodoncia: Teoría y Práctica", autor: "Dra. Patricia Herrera" },
  { title: "Cirugía Maxilofacial: Casos Clínicos y Resolución", autor: "Dr. Francisco Núñez" },
  { title: "Materiales Dentales: Propiedades y Aplicaciones", autor: "Dra. Carolina Vélez" },
  { title: "Oclusión y ATM: Diagnóstico y Tratamiento", autor: "Dr. Javier Montes" },
  { title: "Odontología Pediátrica: Manejo Integral del Paciente Joven", autor: "Dra. Elena Salgado" }
]


export const answers_info = [
  {name:'caries profunda con exposición pulpar'},
  {name:'pulpitis reversible'},
  {name:'necrosis pulpar'},
  {name:'abceso periapical'},
  {name:'caries profunda con compromiso pulpar'},
  {name:'pulpitis irreversible'},
  {name:'fistula crónica'},
]

export const case01_info = {
  title: 'Caso Clínico N°01',
  exam: 'El examen clínico intraoral presenta una dentición mixta temprana. Se observan varias lesiones cariosas en distintas piezas dentales, con lesiones de diversa profundidad. En el primer cuadrante, la pieza 55 presenta una pequeña cavidad en la superficie oclusal, afectando el esmalte. En el segundo cuadrante, la pieza 65 tiene una cavidad que abarca la dentina de poca profundidad. En el tercer cuadrante, la pieza 74 presenta una cavidad superficial en el esmalte, mientras que el diente 75 presenta una cavidad profunda que compromete la pulpa. En el cuarto cuadrante, la pieza 85 presenta una cavidad en distal, también comprometiendo la pulpa dental. En general, las encías y tejidos blandos están en buen estado, con una adecuada inserción gingival y una cantidad de saliva serosa, fluida y abundante.',
  history: 'No se precisa el tiempo de evolución. El niño no reporta dolor actualmente, pero la madre refiere que notó el problema “hace varias semanas”.',
  background: 'Niño de 6 años y 10 meses de edad, en buen estado general de salud (ABEG). Acude a consulta acompañado de su madre, quien menciona que el niño presenta varias lesiones cariosas, incluyendo una pieza dental inferior que parece tener un proceso fistuloso; no se precisa el tiempo de aparición, pero actualmente está asintomático. Tiene una experiencia odontológica previa satisfactoria y sus hábitos alimenticios incluyen el consumo frecuente de dulces, como galletas de chocolate y helados. Presenta una conducta de "paciente colaborador". No padece enfermedades en la actualidad, aunque a los dos años tuvo una infección por el virus mano-pie-boca.',
  work: 'Cual seria tu diagnostico de las pieza 75',
  pain: 'El paciente se encuentra asintomático al momento de la consulta. La madre no puede precisar cuándo apareció la lesión',
}

export const images_case01 = [
  {
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png',
    title: 'Radiografía pieza 75',
    info: 'La 75 muestra una lesión profunda con compromiso pulpar y un área radiolúcida apical sugerente de necrosis. La 85 presenta una lesión profunda distal con compromiso pulpar, zona radiolúcida y posible trayecto fistuloso',
    type: true,
  },
  {
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png',
    title: 'Fotografia pieza 75',
    info: 'Imagen clínica donde la 75 tiene cavidad profunda con posible exposición pulpar. La 85 muestra lesión distal con zona rojiza y supuración mínima visible',
    type: false,
  },
]

export const answers_case01 =[
  {name:'pulpitis irreversible', isCorrect: false},
  {name:'pulpitis reversible', isCorrect: false},
  {name:'necrosis pulpar', isCorrect: false},
  {name:'abceso periapical', isCorrect: true}
]

export const themes = [
  {name: 'Tema 01',botIndex:1}
]

export const themes_case01 = [
  {name: 'Tema 01'}
]

export const papers_case01 = [
  { title: "Fundamentos Avanzados de Endodoncia" },
  { title: "Prótesis Dental: Innovaciones y Técnicas" },
  { title: "Periodoncia Clínica y Cirugía Oral" },
  { title: "Radiología Odontológica: Interpretación y Diagnóstico" },
  { title: "Odontología Estética: Principios y Aplicaciones" },
]