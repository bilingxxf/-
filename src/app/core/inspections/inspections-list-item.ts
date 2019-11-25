import { Expose } from '../../../../node_modules/class-transformer'

export class InspectionsListItem {
  id: number

  /**
   * 项目id
   */
  projectId: number

  /**
   * 用户id
   */
  userId: number

  /**
   * 多张照片的id拼接字符串，多个id间用‘,’分隔
   */
  picIdJoining: string

  /**
   * 评价内容
   */
  content: string

  /**
   * 创建时间
   */
  createTime: number

  @Expose()
  get picList(): number[] {
    return this.picIdJoining.split(',').map(Number)
  }
}
