import { FixPlanTypes } from '../../constant/fix-plan-types.enum'

export class FixPlanCreateDto {

  /**
   * 产品id
   */
  productId: number

  /**
   * 1-周计划；2-月计划
   */
  type: FixPlanTypes

  /**
   * 需求的数量
   */
  quantity: number

  /**
   * 需求开始的时间 （如果是周计划该日期为周一的日期，如果是月计划该日期是每个月一号的日期）
   */
  demandStartDate: number
}
