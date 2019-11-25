export class SecurityLogDetail {
  /**
   * 日志的id
   */
  id: number

  /**
   * 提交日志的用户id
   */
  userId: number

  /**
   * 提交日志的用户名
   */
  userName: string

  /**
   * 当天的安全情况
   */
  situation: number

  /**
   * 日志的内容
   */
  content: string

  /**
   * 记录的日期
   *
   * YYYY-MM-DD
   */
  recordDate: string

  /**
   * 日志的创建时间
   */
  createTime: number
}
