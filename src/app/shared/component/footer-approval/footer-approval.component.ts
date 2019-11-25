import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ActivatedRoute } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { ApprovalModalComponent } from '@shared/component/approval-modal/approval-modal.component'

@Component({
  selector: 'app-footer-approval',
  templateUrl: './footer-approval.component.html',
})
export class FooterApprovalComponent implements OnInit {

    taskId: number

    constructor(
        private route: ActivatedRoute,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(o => this.taskId = o.taskId)
    }

    open() {
        this.modal.create({
            nzTitle: `审批`,
            nzWidth: 600,
            nzComponentParams: { taskId: this.taskId },
            nzContent: ApprovalModalComponent,
            nzFooter: null
        })
    }

}
