import { ProductTypes } from '../../constant/product-types.enum'
import { Box } from '@shared/component/multi-color-box-list/box'
import { Colors } from '../../constant/colors.enum'

export class ProductivityListItem {
  areaDivisionId: number
  areaDivisionName: string
  color: string
  figureNo: string

  /** 成品检验数量 */
  finishedInspectionQuantity: number

  /** 成品数量 */
  finishedRecordQuantity: number
  length: number
  material: string
  modelNum: string
  monomerId: number
  name: string
  pieceWeight: number
  productId: number

  /** 半成品检验数量 */
  semiFinishedInspectionQuantity: number

  /** 半成品数量 */
  semiFinishedRecordQuantity: number
  serialNo: string
  specification: string
  surfaceArea: number
  thickness: number
  totalMeter: number
  totalQuantity: number
  totalWeight: number
  unit: string
  width: number

  toBox(type: ProductTypes, finishType): Box {
    const box = new Box()
    let quantity = 0;
    if (finishType == 1) {
      quantity = this.semiFinishedRecordQuantity;
    } else {
      quantity = this.finishedRecordQuantity;
    }
    box.content = `${this.name} ${type === ProductTypes.结构 ? this.serialNo : this.modelNum} ${quantity}/${this.totalQuantity}`
    let color: string = Colors.GRAY
    switch (quantity) {
      case 0:
        color = Colors.GRAY
        break

      case this.totalQuantity:
        color = Colors.SUCCESS
        break
      
      default:
        color = Colors.WARN
        break;
    }
    box.areas = [{
      color,
      percent: 1
    }]
    return box
  }
}
