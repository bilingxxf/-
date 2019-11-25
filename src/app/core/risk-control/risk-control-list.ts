import { Type } from 'class-transformer'
import { RiskControlFiles } from '../../constant/risk-control-files.enum'
import { iterateEnum } from '../util/util.service'
import * as _ from 'lodash'

export class RiskControlList {
  constructor(public data: RiskControlItem[] = []) {
    iterateEnum(RiskControlFiles).filter(k => data.every(o => o.type !== k)).forEach(k => {
      const item = new RiskControlItem()
      item.type = k
      this.data.push(item)
    })
    this.data.forEach(item => item.referenceDocPath = `assets/risk-reference-docs/${RiskControlFiles[item.type]}.docx`)
    this.data = _.sortBy(this.data, 'type')
  }
}

export class RiskControlItem {
  /**
     * 风控的类别
     */
    type: RiskControlFiles

    /**
     * 上一次提醒日期
     */
    lastRemindDate?: number

    referenceDocPath: string

    /**
     * 上传的附件列表
     */
    @Type(() => RiskControlAttachmentLinks)
    riskControlAttachmentLinks: RiskControlAttachmentLinks[] = []

    getTypeLable() {
      return RiskControlFiles[this.type]
    }
}

export class RiskControlAttachmentLinks {
  /**
   * 风控管理id
   */
  riskControlId: number

  /**
   * 上传者的用户id
   */
  userId: number

  /**
   * 文件的附件id
   */
  attachmentId: number

  /**
   * 附件的上传时间
   */
  createTime: number
}
