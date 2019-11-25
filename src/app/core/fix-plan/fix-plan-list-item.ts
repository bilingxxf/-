import { FixPlanTypes } from '../../constant/fix-plan-types.enum'
import { Box } from '@shared/component/multi-color-box-list/box'
import { Colors } from 'app/constant/colors.enum'

export class PlanItem {
  demandStartDate: number
  type: FixPlanTypes
  quantity: number
  date: string
  demandDate: Date
}

export class FixPlanListItem {

  plans: PlanItem[] = []

  productId: number

  productName: string

  serialNo: string

  totalQuantity: number

  /** 获取已经需求了的数量 */
  getPlannedCount(): number {
    return this.plans.reduce((pv, item) => pv + item.quantity, 0)
  }

  getFinishCount(): number {
    return this.plans.filter(val => {
      return new Date(val.demandDate).getTime() <= new Date().getTime()
    }).reduce((pv, item) => pv + item.quantity, 0)
  }

  // getStartCount: number() {

  // }

  toBox(): Box {
    const box = new Box()
    const plannedCount = this.getPlannedCount();
    const finishCount = this.getFinishCount();
    const startCount = plannedCount - finishCount;
    box.content = `${this.productName} ${this.serialNo} ${plannedCount}/${this.totalQuantity}`
    box.areas.push({
      color: Colors.SUCCESS,
      percent: finishCount / this.totalQuantity
    })
    if (startCount) {
      box.areas.push({
        color: Colors.WARN,
        percent: (startCount) / this.totalQuantity
      })
    }
    // box.areas = [{
    //   color: Colors[3],
    //   percent: plannedCount / this.totalQuantity
    // }]
    return box
  }
}
