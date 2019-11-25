import { ScanTypes } from '../../constant/scan-types.enum'
import { ProductTypes } from '../../constant/product-types.enum'
import { Paginate } from '../common-entity/paginate'
import { moment } from 'ngx-bootstrap/chronos/test/chain'

export class WarehousingFixStaticReqDto extends Paginate {
  projectId: number
  monomerId: number

  startDate: string
  endDate: string

  scanType: string

  /** yyyy-MM-dd */
  queryDate: string

  productType: ProductTypes
  type: ProductTypes

  constructor() {
    super()
    this.setDate(new Date())
  }

  setDate(date: Date) {
    this.queryDate = moment(date).format('YYYY-MM-DD')
  }
}
