import { ProductTypes } from '../../constant/product-types.enum'
import { FixPlanTypes } from '../../constant/fix-plan-types.enum'
import { Paginate } from '@core/common-entity/paginate'

export class FixPlanSummaryQueryDto extends Paginate {
  /** 区域或单体id */
  areaDivisionId: number

  productType: ProductTypes

  type: FixPlanTypes

  /**
   * 查询日期
   *
   * 周计划传YYYY-MM-DD格式，月计划传YYYY-MM
   */
  queryDate: string
}
