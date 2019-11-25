import { Paginate } from '@core/common-entity/paginate'
import { ProductTypes } from '../../constant/product-types.enum'

export class ReceiptAndFixStaticDataQueryDto extends Paginate {
  monomerId: number
  type: ProductTypes
}
