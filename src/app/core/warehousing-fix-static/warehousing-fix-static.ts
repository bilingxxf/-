import { Product } from '@core/product/product'
import { P } from '../warehousing/warehousing-date-item'
import { Type } from 'class-transformer'

export class WarehousingFixStatic {
  @Type(() => P)
  productInfo: P

  productId: number

  /** 收货/安装 */
  recordQuantity: number

  /** 出库 */
  outStockQuantity: number
}
