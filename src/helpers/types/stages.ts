export interface stage_data {
  id:number
  input: string
  botIndex: number
  errors: number
  userId: bigint
  themeId: number
  caseId: number
  paperId: number
  stage: number
  userName: string
}

export interface welcome_data{
  userId: bigint
  userName: string
  botIndex: number
}