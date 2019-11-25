export class ProjectListItem {
  /**
   * 项目id
   */
  id: number

  /**
   * 项目的名称
   */
  name: string

  /**
   * 合同约定开始时间
   */
  startDate: number

  /**
   * 合同约定结束时间
   */
  endDate: number

  /**
   * 总工期
   */
  totalDays: number

  /**
   * 当前用时
   */
  workDays: number

  /**
   * 用时比例
   */
  timePercent: number

  /**
   * 完成的合同金额
   */
  finishedAmount: number

  /**
   * 创建时间
   */
  createTime: number
}
