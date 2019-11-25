export class SecurityLogListReqDto {
  projectId: number

  /** YYYY-MM */
  queryDate: string

  dateType = 1

  userId: number
}
