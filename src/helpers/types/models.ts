export interface intAnswers{
  id?: Number
  name?: String
}

export interface intCases{
  id?: Number
  title?: String
  exam?: String
  history?: String
  background?: String
  painId?: Number
}

export interface intEmbeddings{
  id?: Number
  vector?: Number[]
  paperId?: Number
}

export interface intImages{
  id?: Number
  url?: String
  title?: String
  info?: String
  type?: boolean // true: radiografia || false: imagen clinica
  caseId?: Number
}

export interface intPains{
  id?: Number
  name?: String
}

export interface intPapers{
  id?: Number
  title?: String
  autor?: String
}

export interface intSteps{
  id?: Number
  errors?: Number
  userId?: Number
  themeId?: Number
  caseId?: Number
  paperId?: Number
}

export interface intThemes{
  id?: Number
  name?: String
}

export interface intUsers{
  id?: Number
  name?: String
}

export interface intAnswersOnCases{
  answerId?: Number
  caseId?: Number
  isCorrect?: Boolean
}

export interface intThemesOnCases{
  themeId?: Number
  caseId?: Number
}

export interface intThemesOnPapers{
  themeId?: Number
  paperId?: Number
}