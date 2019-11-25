import { CargoList } from './cargo-list'
import { WarehouseOutItem } from '@core/warehouse-out/warehouse-out-item'

export class CarInListDetail extends CargoList {
  userName: string
  data: WarehouseOutItem[] = []
}
