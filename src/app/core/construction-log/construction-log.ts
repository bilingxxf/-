import { ConstructionLogCreateDto } from '@core/construction-log/construction-log-create-dto'

export class ConstructionLog extends ConstructionLogCreateDto {
  id: number

  isWriteUp: boolean

  /** YYYY-MM-DD */
  recordDate: string
}
