import { Component, OnInit, Input } from '@angular/core'
import { QualityAndSecurityService } from '../../../../core/quality-and-security/quality-and-security.service'
import { PagingData } from '@core/common-entity/paging-data'
import { QualityAndSecurityListItem } from '../../../../core/quality-and-security/quality-and-security-list-item'
import { QualityAndSecurityQueryDto } from '@core/quality-and-security/quality-and-security-query-dto'
import { Attachment } from '@core/common-entity/attachment'
import { Lightbox } from 'ngx-lightbox'
import { ProblemStatus } from '../../../../constant/problem-status.enum'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-quality-and-security-mgmt',
  templateUrl: './quality-and-security-mgmt.component.html',
})
export class QualityAndSecurityMgmtComponent implements OnInit {

  @Input() projectId: number

  data = new PagingData<QualityAndSecurityListItem>()

  dto = new QualityAndSecurityQueryDto()

  problemStatus = ProblemStatus

  constructor(
    private qualityAndSecurityService: QualityAndSecurityService,
    private lightbox: Lightbox,
    private msg: NzMessageService
  ) { }

  async ngOnInit() {
    this.dto.projectId = this.projectId
    this.getData()
  }

  async getData() {
    this.data = await this.qualityAndSecurityService.list(this.dto)
  }

  /**
    * 预览图片
    */
  preview(attachments: Attachment[], index: number) {
    this.lightbox.open(attachments.map(o => ({
      src: o.getPath(),
      thumb: o.getPath()
    })), index)
  }

  async close(id: number): Promise<void> {
    await this.qualityAndSecurityService.close(id)
    this.msg.success('关闭成功')
    this.getData()
  }
}
