export interface intAnswers {
  id?: number;
  name: string;
}

export interface intCases {
  id?: number;
  title: string;
  exam: string;
  history: string;
  background: string;
  pain: string;
  work: string;
}

export interface intEmbeddings {
  id?: number;
  vector?: number[];
  paperId?: number;
}

export interface intImages {
  id?: number;
  url: string;
  title: string;
  info: string;
  type: boolean; // true: radiografia || false: imagen clinica
  caseId?: number;
}

export interface intPapers {
  id: number;
  title: string;
  autor: string;
}

export interface intSteps {
  id?: number;
  errors?: number;
  userId?: string;
  themeId?: number;
  caseId?: number | null;
  selectedTooth?: string | null;
  solvedTeeth?: string[];
  stage?: number;
  paperId?: number;
}

export interface intThemes {
  id?: number;
  name?: string;
  botIndex?: number;
}

export interface intUsers {
  id?: number;
  name?: string;
}

export interface intAnswersOnCases {
  answerId?: number;
  caseId?: number;
  isCorrect?: Boolean;
}

export interface intThemesOnCases {
  themeId?: number;
  caseId?: number;
}

export interface intThemesOnPapers {
  themeId?: number;
  paperId?: number;
}
