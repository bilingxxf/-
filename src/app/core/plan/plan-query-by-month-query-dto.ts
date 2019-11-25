import * as moment from 'moment'
import { ProductTypes } from '../../constant/product-types.enum'

export class PlanQueryByMonthQueryDto {
  projectId?: number

  productType: number = ProductTypes.结构

  yearMonth = moment().format('YYYY-MM')

  monomerId?: number
}
