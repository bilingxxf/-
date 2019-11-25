import { Paginate } from '@core/common-entity/paginate'

export class CargoListQueryDto extends Paginate {
  projectId: number
  monomerId: number
  outStockDate: string
  receiptDate: string
    startDate: string;
    endDate: string;
}
