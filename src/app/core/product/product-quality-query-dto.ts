import { Paginate } from '../common-entity/paginate'
import { ProductTypes } from '../../constant/product-types.enum'

export class ProductQualityQueryDto extends Paginate {
  /** 单体或区域id */
  monomerId: number

  serialNo?: string;

  type = ProductTypes.结构
  
}
