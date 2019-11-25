import { Department } from '@core/department/department'
import { Type, Transform } from 'class-transformer'
import { Feedback } from '@core/problem/problem-detail'
import { Attachment } from '@core/common-entity/attachment'
import { ProblemStatus } from '../../constant/problem-status.enum'
import { QualityAndSecurityTypes } from '../../constant/quality-and-security-types.enum'

export class QualityAndSecurityListItem {
  id: number

  projectId: number

  content: string

  /** 日期 */
  createTime: number

  departName: string

  /**
   * 部门列表
   */
  departments: {
    departmentId: number,
    departmentName: string,
    isMain: boolean
  }[] = []

  /**
   * 截止日期
   *
   * YYYY-MM-DD
   */
  endDate: string

  @Type(() => Feedback)
  @Transform(v => v || new Feedback())
  feedback: Feedback

  /**
   * 附件照片
   */
  @Type(() => Attachment)
  @Transform(v => v || [])
  pictures: Attachment[] = []

  status: ProblemStatus

  type: QualityAndSecurityTypes

  getTypeLabel(): string {
    return QualityAndSecurityTypes[this.type]
  }

  getSenderDepartmentName(): string {
    const d = this.departments.find(o => o.isMain)
    return d ? d.departmentName : ''
  }
}
