  import { WarehouseType } from '../../constant/warehouse-type.enum'
export class WarehousingItem {
  areaDivisionId: number

  /** 区域名称 */
  areaDivisionName: string

  /** 产品名称 */
  name: string

  /** 产品型号 */
  serialNo: string

  /** 总数 */
  totalQuantity: number

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

  type: WarehouseType
  recordQuantity: number

  inStockQuantity: number
  outStockQuantity: number

  inStockWeight: number 
  outStockWeight: number
  useArea: string
}
