import { ProductTypes } from '../../constant/product-types.enum'

export class Product {
  id: number

  /** 单体id */
  monomerId: number

  /** 区域划分id */
  areaDivisionId: number

  /** 产品/构件名称 */
  name: string

  /** 产品类别 1-构件， 2-围护， 3-辅材 */
  type: ProductTypes

  /** 图号 */
  figureNo: string

  /** 构件编号 */
  serialNo: string

  /** 规格 */
  specification: string

  /** 长度 */
  length: number

  /** 材质 */
  material: string

  /** 数量 */
  quantity: number

  /** 备注信息 */
  tip: string

  /** 创建时间 */
  createTime: number

  /** 更新时间 */
  updatedTime: number

  /**状态  1进行中  2暂停 */
  status: number;

  /** 上一次状态 */
  lastStatus: number;

}
