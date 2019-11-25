import { WarehouseType } from '../../constant/warehouse-type.enum'

export class WarehouseOutItem {
  areaDivisionId: number
  areaDivisionName: string
  monomerId: number
  name: string
  productId: number
  pieceWeight: number
  recordQuantity: number
  serialNo: string
  totalQuantity: number

  /** 工地实收数量 */
  receiptQuantity: number
  type: WarehouseType

  modelNum: string
  material: string

  quantity: number
}
