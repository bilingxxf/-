
export class AllotDetailListDto {
  // 创建时间
  createDate: string
  
  // 某天最早的操作时间
  startDate: number

  // 某天最晚的操作时间
  endDate: number

  // 是否更新大于0说明有修改
  hasUpdate: number

  // 班组名称
  name: string

  // 分配重量
  number: number

  // 用户id
  userId: number

  // 分配重量
  weight: number
}
