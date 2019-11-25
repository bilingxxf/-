import { Paginate } from '../common-entity/paginate'

export class ComponentQueryDto extends Paginate {
  serialNo?: string

  areaDivisionId: number

  monomerId: number

  productionLineId: number

  userId:number

  name:any
}
