import { Attachment } from '@core/common-entity/attachment'
import { Type, Transform } from 'class-transformer'
import { ProblemStatus } from '../../constant/problem-status.enum'

export class ProblemDetail {
  reportId: number

  /**
   * 扫码记录id
   */
  recordId: number

  /**
   * 提交报告者的用户id
   */
  userId: string

  /**
   * 接收部门
   */
  departmentName: string

  /**
   * 提交报告者的用户名称
   */
  userName: string

  attachments: any

  /**
   * 部门列表
   */
  @Type(() => Department)
  departments: Department[] = []

  /**
   * 附件照片
   */
  @Type(() => Attachment)
  @Transform(v => v || [])
  pictures: Attachment[] = []

  /**
   * 质检的项目列表（只有品质扫码有）
   */
  @Transform(v => v || [])
  inspectionItems: {
    itemId: number

    /** 是否通过 */
    isPassed: boolean

    /** 检查项 */
    item: string
  }[] = []

  /**
   * 问题的描述
   */
  description: string

  /**
   * 问题的状态 0-未处理； 1-已处理
   */
  status: ProblemStatus

  /**
   * 截止日期
   */
  endDate: number

  /**
   * 创建时间
   */
  createTime: number


  @Type(() => Feedback)
  feedback: Feedback

  getStatusLabel(): string {
    return ProblemStatus[this.status]
  }

  get notPassedInspectionItemsLength(): number {
    return this.inspectionItems.filter(o => !o.isPassed).length
  }
}

class Department {
  departmentId: number

  departmentName: string

  /** 是否是主送单位 */
  isMain: boolean
}

export class Feedback {
  content: string


  @Type(() => Attachment)
  @Transform(v => v || [])
  pictures: Attachment[] = []
}
