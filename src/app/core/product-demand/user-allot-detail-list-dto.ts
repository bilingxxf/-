import { Paginate } from '../common-entity/paginate'
// import { ProductTypes } from 'app/constant/product-types.enum'

export class UserAllotDetailListDto extends Paginate {
//   productType = ProductTypes.结构
  startDate: string
  endDate: string
  areaDivisionId: number
  monomerId: any
  userName: string
}
