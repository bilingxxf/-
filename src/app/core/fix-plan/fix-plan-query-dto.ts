import { ProductTypes } from 'app/constant/product-types.enum'
import { FixPlanTypes } from '../../constant/fix-plan-types.enum'
import { Paginate } from '@core/common-entity/paginate'

export class FixPlanQueryDto extends Paginate {
  /** 区域或单体id */
  areaDivisionId: number

  productType: ProductTypes

  type: FixPlanTypes

  monomerId?: number

  demandStartDate: number;
}
