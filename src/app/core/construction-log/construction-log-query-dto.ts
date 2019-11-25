import * as moment from 'moment'

export class ConstructionLogQueryDto {
  projectId: number

  dateType = 1

  userId: number

  queryDate = moment().format('YYYY-MM')
}
