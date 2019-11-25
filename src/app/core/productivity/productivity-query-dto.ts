import { Paginate } from '@core/common-entity/paginate'
import { ProductTypes } from '../../constant/product-types.enum'
import * as moment from 'moment'
import { Box } from '@shared/component/multi-color-box-list/box'

export class ProductivityQueryDto extends Paginate {

  queryDate: string

  monomerId: number

  serialNo?: string
  status?: number

  createDate?: string
  productionLineId?:number
  areaDivisionId?:number

  constructor(
    public productType: ProductTypes,
  ) {
    super()
    this.productType = productType
    this.setDate(new Date())
  }

  setDate(date: Date) {
    this.queryDate = moment(date).format('YYYY-MM-DD')
  }
}
