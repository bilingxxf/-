import { ProductSubcontractResDto } from '@core/product-subcontract/product-subcontract-res-dto'
import { ProductSubcontractor } from '@core/product-subcontract/product-subcontractor'
import { OriginalFile } from '../file/original-file'

export class ProductSubcontractDetail {
  subcontractor = new ProductSubcontractor()

  detail = new ProductSubcontractResDto()

  /** 附件 */
  attachments: number[] = []

  originalFiles: OriginalFile[] = []

  totalQuantity: number

  totalWeight: number
}
