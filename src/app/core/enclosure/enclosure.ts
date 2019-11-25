export class Enclosure {
  id: number

  /** 产品名称 */
  name: string

  monomerId: number

  /** 单重 */
  pieceWeight: number

  /** 数量 */
  quantity: number

  /** 长度 */
  length: number

  /** 材质 */
  material: string

  /** 板型 */
  modelNum: string

  /** 规格 */
  specification: string

  /** 单位 */
  unit: string

  /**
   * 有效宽度
   */
  width: number

  /**
   * 颜色
   */
  color: string

  /**
   * 厚度
   */
  thickness: number

  /**
   * 总米数
   */
  totalMeter: number

  /**
   * 表面积
   */
  surfaceArea: number

  type: number

  status: number

  // 使用部位
  useArea: string
  lastStatus: number;
}
