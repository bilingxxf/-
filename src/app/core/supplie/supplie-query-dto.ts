import { Paginate } from '@core/common-entity/paginate'

export class SupplieQueryDTO extends Paginate {

  // 单体id
  monomerId: number

  productId:number

  supplierId:number
  
  // 查询日期
  date: string

  // 查询内容
  queryContent:string

  loading:boolean = false

  productType: number = 2

  productName: string
  // 生产类型 1-发工地；2-发工厂
  manufactureType: number
}
