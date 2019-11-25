import { P } from '../warehousing/warehousing-date-item'
import { Box } from '@shared/component/multi-color-box-list/box'
import { Colors } from '../../constant/colors.enum'

export class ReceiptAndFixStaticData extends P {
  setupQuantity: number

  receiptQuantity: number

  toBox(isSetup: boolean): Box {
    const box = new Box()
    const count = isSetup ? this.setupQuantity : this.receiptQuantity
    box.content = `${this.name} ${this.serialNo} ${count}/${this.totalQuantity}`
    let color = Colors.WARN
    if (count >=  this.totalQuantity) {
      color = Colors.SUCCESS
    } else if (count === 0) {
      color = Colors.GRAY
    }
    box.areas = [{
      color,
      percent: 1
    }]
    return box
  }
}
