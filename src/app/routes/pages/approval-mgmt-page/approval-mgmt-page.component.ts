import { Component, OnInit } from '@angular/core'
import { ApprovalQueryDto } from '../../../core/approval/approval-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { ApprovalListItem } from '../../../core/approval/approval-list-item'
import { ApprovalService } from '../../../core/approval/approval.service'

@Component({
  selector: 'app-approval-mgmt-page',
  templateUrl: './approval-mgmt-page.component.html',
})
export class ApprovalMgmtPageComponent implements OnInit {

    dto = new ApprovalQueryDto()

    data = new PagingData<ApprovalListItem>()

    constructor(
        public approvalService: ApprovalService
    ) { }

    ngOnInit() {
        this.getData()
    }

    async getData() {
        this.data = await this.approvalService.list(this.dto)
    }
}
