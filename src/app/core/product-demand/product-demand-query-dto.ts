import { Paginate } from '../common-entity/paginate'
import { ProductTypes } from 'app/constant/product-types.enum'

export class ProductDemandQueryDto extends Paginate {
  productType = ProductTypes.结构

  // 区域
  areaDivisionId: number

  // 构件编号
  serialNo: any

  // 类型   0：有可分配的，1：无可分配的  不传：全部
  type: number
}
