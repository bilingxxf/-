export class BaseDTO {

  // 单体id
  monomerId: number
  
  // 查询日期
  date: string

  queryDate: string

  // 开始时间
  startDate:string

  // 结束时间
  endDate:string

  // 查询内容
  queryContent:string

  loading:boolean = false
}
