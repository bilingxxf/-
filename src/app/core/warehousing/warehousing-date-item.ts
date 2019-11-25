import { Product } from '@core/product/product'

export class WarehousingDateItem {
  productId: number

  productInfo: P

  receiptQuantity: number

  stockQuantity: number
}

export class P extends Product {
  areaDivisionName: string

  totalQuantity: number

  pieceWeight: number

  totalWeight: number

  color: string

  thickness: number

  modelNum: string

  width: number

  totalMeter: number

  surfaceArea: number
}
