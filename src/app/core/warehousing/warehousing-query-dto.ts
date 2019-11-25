import { Paginate } from '@core/common-entity/paginate'
import { WarehouseType } from '../../constant/warehouse-type.enum'
import { ProductTypes } from '../../constant/product-types.enum'
import * as moment from 'moment'

export class WarehousingQueryDto extends Paginate {
  monomerId: number

  startDate: string

  endDate: string

  queryDate?: string

  projectId: number;

  serialNo?: string;

  productType = ProductTypes.结构

  warehouseType = WarehouseType.入库

  constructor() {
    super()
    this.setDate(new Date())
  }

  setDate(date: Date) {
    this.queryDate = moment(date).format('YYYY-MM-DD')
  }
}
