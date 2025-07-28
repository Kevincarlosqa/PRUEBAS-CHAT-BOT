
interface Cases{
  title: string
  exam: string
  history: string
  background: string
  work: string
  pain: string
}

interface AnswerCases {
  answerId: number
  isCorrect: boolean
}

export interface post_case_body {
  caso: Cases
  answers: AnswerCases[]
  themes: number[]
}


export interface basic_table{
  id: number
  name: string
}
