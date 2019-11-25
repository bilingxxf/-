import { Paginate } from '../common-entity/paginate'
import { ProductTypes } from '../../constant/product-types.enum'

export class TotalPregressQueryDto extends Paginate {
  projectId: number
  productType = ProductTypes.结构
  monomerId: number
  serialNo: any
  productName: any
}
