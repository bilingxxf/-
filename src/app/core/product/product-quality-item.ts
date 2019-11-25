export class ProductQualityItem {
  /** 已检测数量 */
  inspectionQuantity: number

  /** 产品名称 */
  name: '垫板'

  /** 产品型号 */
  serialNo: '8'

  /** 总数 */
  totalQuantity: 2

  /** 规格 */
  specification: string

  /** 长度 */
  length: number

  /** 材质 */
  material: string

  /** 产品id */
  productId: 0

  pieceWeight: number

  totalWeight: number

  color: string

  thickness: number

  modelNum: string

  width: number

  totalMeter: number
  surfaceArea: number

  inspectionStats: {

    /** 成品未通过的数量 */
    finishedFailedQuantity: number

    /** 成品通过数量 */
    finishedPassedQuantity: number

    /** 半成品未通过数量 */
    semiFinishedFailedQuantity: number

    /** 半成品通过的数量 */
    semiFinishedPassedQuantity: number
  }
}
