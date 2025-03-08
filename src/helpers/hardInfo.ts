// DATA
  export const bookList  = [
    { id: 1,name: "Fundamentos Avanzados de Endodoncia", autor: "Dr. Ricardo Montalvo" },
    { id: 2,name: "Prótesis Dental: Innovaciones y Técnicas", autor: "Dra. Valeria Guzmán" },
    { id: 3,name: "Periodoncia Clínica y Cirugía Oral", autor: "Dr. Esteban Romero" },
    { id: 4,name: "Radiología Odontológica: Interpretación y Diagnóstico", autor: "Dra. Sofía Ledesma" },
    { id: 5,name: "Odontología Estética: Principios y Aplicaciones", autor: "Dr. Alejandro Paredes" },
    { id: 6,name: "Biomecánica en Ortodoncia: Teoría y Práctica", autor: "Dra. Patricia Herrera" },
    { id: 7,name: "Cirugía Maxilofacial: Casos Clínicos y Resolución", autor: "Dr. Francisco Núñez" },
    { id: 8,name: "Materiales Dentales: Propiedades y Aplicaciones", autor: "Dra. Carolina Vélez" },
    { id: 9,name: "Oclusión y ATM: Diagnóstico y Tratamiento", autor: "Dr. Javier Montes" },
    { id:10,name: "Odontología Pediátrica: Manejo Integral del Paciente Joven", autor: "Dra. Elena Salgado" }
  ]


  export const casesInfo = [
    {
      id:1,
      name: 'CASO CLINICO 01',
      patient: 'Varón de 6 años y 10 meses con buen estado de salud de conducta dócil',
      info: 'Acude a consulta acompañado de su madre. Presenta varias lesiones cariosas, incluyendo una pieza dental inferior que parece tener un proceso fistuloso; no se precisa el tiempo de aparición, pero actualmente está asintomático. Sus hábitos alimenticios incluyen el consumo frecuente de dulces, como galletas de chocolate y helados. A los dos años tuvo una infección por el virus mano-pie-boca. \nExamen clínico:El examen clínico intraoral presenta una dentición mixta temprana. Se observan varias lesiones cariosas en distintas piezas dentales, con lesiones de diversa profundidad. En el primer cuadrante, la pieza 55 presenta una pequeña cavidad en la superficie oclusal, afectando el esmalte. En el segundo cuadrante, la pieza 65 tiene una cavidad que abarca la dentina de poca profundidad. En el tercer cuadrante, la pieza 74 presenta una cavidad superficial en el esmalte, mientras que el diente 75 presenta una cavidad profunda que compromete la pulpa. En el cuarto cuadrante, la pieza 85 presenta una cavidad en distal, también comprometiendo la pulpa dental. En general, las encías y tejidos blandos están en buen estado, con una adecuada inserción gingival y una cantidad de saliva serosa, fluida y abundante.',
      photos: [
        {name: 'pieza x', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png'},
        {name: 'pieza y', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/132.png'},
        {name: 'pieza z', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png'},
      ],
      answer: 'chi'
    },
    {
      id:2,
      name: 'CASO CLINICO 02',
      patient: 'Varón de 7 años con buen estado de salud de conducta dócil',
      info: 'Acude a consulta acompañado de su madre. Presenta varios dientes con pigmentaciones negruzcas y, a veces, le causa dolor. Tiene antecedentes de tratamiento odontológico previo con fluorización y restauraciones \nExamen clínico:El examen clínico intraoral presenta una dentición mixta temprana. Se observan varias lesiones cariosas en distintas piezas dentales, con lesiones de diversa profundidad. En el primer cuadrante, la pieza 54 presenta lesión cavitada de coloración negruzca en caras oclusal y palatina no presenta dolor a la percusión ni reacción a los cambios térmicos. La pieza 64 presenta lesión cavitada de coloración negruzca en cara oclusal, no presenta dolor a la percusión ni reacción a los cambios térmicos tiene una cavidad que abarca la dentina de poca profundidad. En el tercer cuadrante, la pieza 74. Presencia de material de restauración con bordes regulares y negruzco. Compatible con recidiva caritas. 84. Presencia de material de restauración con bordes regulares y negruzco. Compatible con recidiva caritas. En general, las encías y tejidos blandos están en buen estado, con una adecuada inserción gingival y una cantidad de saliva serosa, fluida y abundante.',
      photos: [
        {name: 'pieza a', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png'},
        {name: 'pieza b', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png'},
        {name: 'pieza c', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/7.png'},
        {name: 'pieza d', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/11.png'},
      ],
      answer: 'ño'
    },
  ]


// MENU OPTIONS
  export const viewPhotos = 'Ver una foto'
  export const makeQuestion = 'Consultar una bibliografia'
  export const makeDiagnosis = 'Hacer el diagnostico'
  export const changeCase = 'Cambiar de caso'
  export const stageTwoOptions = [ viewPhotos, makeQuestion, makeDiagnosis, changeCase ]