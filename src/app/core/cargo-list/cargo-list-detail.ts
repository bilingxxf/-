import { CargoList } from './cargo-list'
import { WarehouseOutItem } from '@core/warehouse-out/warehouse-out-item'

export class CargoListDetail extends CargoList {
  userName: string
  data: any[] = []
  productList: WarehouseOutItem[] = []
  totalCount: number
}
