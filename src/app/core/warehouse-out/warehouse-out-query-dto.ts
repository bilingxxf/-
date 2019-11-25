import { Paginate } from '@core/common-entity/paginate'
import { WarehouseType } from '../../constant/warehouse-type.enum'

export class WarehouseOutQueryDto extends Paginate {
  monomerId: number

  warehouseType = WarehouseType.出库
}

