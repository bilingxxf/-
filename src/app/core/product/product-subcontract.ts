import { Type } from '../../../../node_modules/class-transformer'
import { Box } from '@shared/component/multi-color-box-list/box'
import * as _ from 'lodash'

/** 产品的分包信息 */
export class ProductSubcontract {
  id: number

  /** 产品名称 */
  name: string

  /** 产品编号 */
  serialNo: string

  /** 板型 */
  modelNum: string

  /** 产品的总数 */
  quantity: number

  /** 产品的类型 */
  type: number

  /** 规格 */
  specification: string

  /** 长度 */
  length: number

  /** 材质 */
  material: string

  @Type(() => SubcontractDetailList)
  subcontractDetailList: SubcontractDetailList[] = []

  toBox(subcontractorColors: {
    id: number,
    color: string
  }[]): Box {
    const box = new Box()
    box.content = [this.name, this.serialNo, this.quantity].join(' ')
    box.areas = this.subcontractDetailList.map(o => ({
      color: subcontractorColors.find(sc => sc.id === o.subcontractorId).color,
      percent: o.quantity / this.quantity
    }))
    return box
  }

  /**
   * 获取剩余未分包的数量
   */
  getLeft(): number {
    return this.quantity - _.sum(this.subcontractDetailList.map(o => o.quantity))
  }
}

export class SubcontractDetailList {
  /** 分包商id */
  subcontractorId: number

  name: string

  /** 分包数量 */
  quantity: number
}
