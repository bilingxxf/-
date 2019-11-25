import { Paginate } from '../common-entity/paginate'

export class RecordListDto extends Paginate {
  type: number 
  monomerId: number     
}
