export class ComponentBusinessEntrySummary {

  items: ComponentBusinessEntrySummaryItem[] = []

  getTotal(): number {
    return this.items.reduce((pv, item) => pv + item.totalFinishedProductPrice + item.totalUnitFixPrice, 0)
  }
}

export class ComponentBusinessEntrySummaryItem {
  areaDivisionId: number
  areaName: string
  totalFinishedProductPrice: number
  totalUnitFixPrice: number
  totalWeight: number
}
