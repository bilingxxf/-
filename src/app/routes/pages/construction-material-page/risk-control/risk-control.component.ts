import { Component, OnInit, Input } from '@angular/core'
import { RiskControlService } from '../../../../core/risk-control/risk-control.service'
import { RiskControlList, RiskControlItem } from '@core/risk-control/risk-control-list'
import { NzModalService, UploadChangeParam, NzMessageService } from 'ng-zorro-antd'
import { RiskControlUploadHistoryModalComponent } from './risk-control-upload-history-modal/risk-control-upload-history-modal.component'
import { RiskControlUploadReqDto } from '../../../../core/risk-control/risk-control-upload-req-dto'

@Component({
  selector: 'app-risk-control',
  templateUrl: './risk-control.component.html',
})
export class RiskControlComponent implements OnInit {

  data = new RiskControlList()

  @Input() projectId: number

  constructor(
    private riskControlService: RiskControlService,
    private modal: NzModalService,
    private msg: NzMessageService
  ) { }

  async ngOnInit() {
    this.data = await this.riskControlService.getAll(this.projectId)
  }

  showUploadHistory(item: RiskControlItem) {
    this.modal.create({
      nzTitle: `上传历史`,
      nzWidth: 600,
      nzComponentParams: { item },
      nzContent: RiskControlUploadHistoryModalComponent,
      nzFooter: null
    })
  }

  async change(e: UploadChangeParam, item: RiskControlItem) {
    if (e.file.status !== 'done') return
    const response = e.file.response
    const dto = new RiskControlUploadReqDto()
    dto.projectId = this.projectId
    dto.attachmentId = response.data
    dto.type = item.type
    try {
      await this.riskControlService.upload(dto)
      this.msg.success('上传成功')
    } catch (e) {
      this.msg.error(e.error.message)
    }
  }
}
