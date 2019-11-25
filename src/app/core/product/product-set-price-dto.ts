export class ProductSetPriceDto {
  color: string
  thickness: number
  modelNum: string
  totalNumber: number
  totalSurfaceArea: number
  
  areaDivisionId: number
  productId: number
  monomerId?: number
  // 构件名称
  name: String 

  // 构件材料
  material: String

  /** 成品综合价 */
  finishedProductPrice?: number

  /** 安装综合价 */
  unitFixPrice?: number
  
}
