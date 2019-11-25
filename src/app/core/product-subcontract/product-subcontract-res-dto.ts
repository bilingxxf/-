import { ProductTypes } from '../../constant/product-types.enum'
import { ProductSubcontractListItem } from '@core/product-subcontract/product-subcontract-list-item'
import { Attachment } from '@core/common-entity/attachment'

export class ProductSubcontractResDto {

  /** 产品类型 */
  productType: ProductTypes

  /**
   * 状态
   *
   * 用于判断发送与否
   */
  status: string

  /** 分包详情 */
  products: ProductSubcontractListItem[] = []

  /** 总数 */
  totalQuantity: number

  /** 总重 */
  totalWeight: number

  attachments: Attachment[] = []
}
