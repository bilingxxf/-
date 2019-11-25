import * as _ from 'lodash'
export class AreaComponentSummary {
  items: AreaComponentSummaryItem[] = []

  findByAreaId(areaId): AreaComponentSummaryItem {
    return _.find(this.items, item => item.areaDivisionId === areaId)
  }
}

export class AreaComponentSummaryItem {
  areaDivisionId: number
  areaName: string
  totalQuantity: number
  totalWeight: number
}
