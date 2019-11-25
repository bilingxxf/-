import { Product } from '@core/product/product'


/** 构件也是产品的一种 */
export class ProductComponent extends Product {
  /** 构件单重 */
  pieceWeight: number

  /** 总重 */
  totalWeight: number

  /** 表面积 */
  surfaceArea: number

  structure:any
}
