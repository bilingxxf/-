import { Component, OnInit, Input } from '@angular/core'
import { ConstructionLogExportDto } from '../../../../core/construction-log/construction-log-export-dto'
import { ConstructionLogService } from '@core/construction-log/construction-log.service'
import * as moment from 'moment'
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-construction-log-export-modal',
  templateUrl: './construction-log-export-modal.component.html',
})
export class ConstructionLogExportModalComponent implements OnInit {

    @Input() projectId: number

    startDate: Date | '' = ''

    endDate: Date | '' = ''

    dto: ConstructionLogExportDto

    constructor(
        private constructionLogService: ConstructionLogService,
        private subject: NzModalRef
    ) { }

    async ngOnInit() {
        this.dto = new ConstructionLogExportDto(this.projectId)
    }

    async ok() {
        this.dto.startDate = moment(this.startDate).format('YYYY-MM-DD')
        this.dto.endDate = moment(this.endDate).format('YYYY-MM-DD')
        window.open(this.constructionLogService.getExportUrl(this.dto))
        // this.constructionLogService.getExportUrl(this.dto)
        this.subject.triggerOk();
    }

    /** 取消弹窗 */
    cancel() {
        this.subject.triggerCancel();
    }

}
