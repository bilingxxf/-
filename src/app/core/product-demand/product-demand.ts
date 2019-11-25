import { Box } from '@shared/component/multi-color-box-list/box'
import { Colors } from '../../constant/colors.constant'

export class PlanItem {
   /**
     * 需求数量
     */
    demandQuantity: number

    /**
     * 需求日期
     */
    demandDate: number

    date: string;

    /**
     * 需求的优先级
     */
    priority: number


    deadline: number
    needQuantity: number
    username: string
    userId: any
    hasChagne: boolean
    id:any
    productionLineId: any
}

export class ProductDemand {
  demandPlans: PlanItem[];

  productId: number

  productName: string

  serialNo: string

  totalQuantity: number
  manufacturePlans:PlanItem[];
  isChecked = false

  /** 获取已经需求了的数量 */
  getDemandedCount(): number {
    return this.demandPlans.reduce((pv, item) => pv + item.demandQuantity, 0)
  }
  //任务需求
  getDemandedCount1(): number {
    return this.manufacturePlans.reduce((pv, item) => pv + item.needQuantity, 0)
  }
  toBox1(): Box {
    const box = new Box()
    const demandedCount = this.getDemandedCount1()
    box.content = `${this.productName} ${this.serialNo} ${demandedCount}/${this.totalQuantity}`
    box.isChecked = false;
    box.areas = [{
      color: Colors[3],
      percent: demandedCount / this.totalQuantity
    }]
    return box
  }

  toBox(): Box {
    const box = new Box()
    const demandedCount = this.getDemandedCount()
    box.content = `${this.productName} ${this.serialNo} ${demandedCount}/${this.totalQuantity}`
    box.isChecked = false;
    box.areas = [{
      color: Colors[3],
      percent: demandedCount / this.totalQuantity
    }]
    return box
  }

  /** 是不是总数已经满了 */
  isFull(): boolean {
    return this.getDemandedCount() === this.totalQuantity
  }

  /** 是不是总数已经满了 */
  isFull1(): boolean {
    return this.getDemandedCount1() === this.totalQuantity
  }
}
