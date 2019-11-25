import { Paginate } from '@core/common-entity/paginate'

export class SupportMaterialQueryDto extends Paginate {
  monomerId: number
  name: string
  serialNo: string
}
