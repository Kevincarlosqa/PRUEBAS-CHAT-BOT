export interface stage_data {
  id:number
  input: string
  botIndex: number
  errors: number
  userId: string
  themeId: number
  caseId: number | null
  paperId: number | null
  selectedTooth?: string | null
  stage: number
  userName: string
}

export interface welcome_data{
  userId: string
  userName: string
  botIndex: number
}