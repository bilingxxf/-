import { Attachment } from '../common-entity/attachment'
import { Type, Transform } from 'class-transformer'

export class ContactLetterDetail {

  @Type(() => Attachment)
  @Transform(v => v || [])
  attachments: Attachment[] = []

  id: number

  /**
   * 项目名称
   */
  projectName: string

  /**
   * 项目的合同编号
   */
  contractNo: string

  /**
   * 提交函件的用户id
   */
  userId: number

  /**
   * 提交函件的用户名
   */
  userName: string

  /**
   * 承包单位
   */
  subcontractor: string

  /**
   * 主送单位
   */
  mainSender: string

  /**
   * 抄送的单位
   */
  subSender: string

  /**
   * 函件的主题
   */
  theme: string

  /**
   * 函件的内容
   */
  content: string

  createTime: number
}
