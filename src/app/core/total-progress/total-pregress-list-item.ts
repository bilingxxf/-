import { Transform, Type } from '../../../../node_modules/class-transformer'

export class TotalPregressListItem {
  areaDivisionId: number

  /** 区域名称 */
  areaDivisionName: string

  /** 构件名称 */
  name: string

  /** 构件编号 */
  serialNo: string

  /** 总数 */
  totalQuantity: number

  /**
   * 半成品扫码总数
   */
  semiFinishedRecordQuantity: number

  /**
   * 成品扫码总数
   */
  finishedRecordQuantity: number

  /**
   * 半成品质检数量
   */
  semiFinishedInspectionQuantity: number

  /**
   * 成品质检数量
   */
  finishedInspectionQuantity: number

  /**
   * 质检数据统计
   */
  @Type(() => InspectionStats)
  @Transform(v => v || new InspectionStats())
  InspectionStats = new InspectionStats()

  /**
   * 入库的数量
   */
  inStockQuantity: number

  /**
   * 出库数量
   */
  outStockQuantity: number

  /**
   * 工地实收数量
   */
  receiptQuantity: number

  /**
   * 单重
   */
  pieceWeight: number

  /**
   * 安装的数量
   */
  setupQuantity: number
}

class InspectionStats {
  /**
   * 半成品通过的数量
   */
  semiFinishedPassedQuantity = 0

  /**
   * 半成品未通过数量
   */
  semiFinishedFailedQuantity = 0

  /**
   * 成品通过数量
   */
  finishedPassedQuantity = 0

  /**
   * 成品未通过的数量
   */
  finishedFailedQuantity = 0
}
