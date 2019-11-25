import { Component, OnInit, Input } from '@angular/core'
import { PagingData } from '../../../core/common-entity/paging-data'
import { ProjectEvaluationListItem } from '@core/project-evaluation/project-evaluation-list-item'
import { ProjectEvaluationQueryDto } from '@core/project-evaluation/project-evaluation-query-dto'
import { ProjectEvaluationService } from '../../../core/project-evaluation/project-evaluation.service'

@Component({
  selector: 'app-inspection-mgmt-page',
  templateUrl: './inspection-mgmt-page.component.html',
})
export class InspectionMgmtPageComponent implements OnInit {

    @Input() projectId: number

    data = new PagingData<ProjectEvaluationListItem>()

    dto = new ProjectEvaluationQueryDto()

    constructor(
        private projectEvaluationService: ProjectEvaluationService
    ) { }

    async ngOnInit() {
        this.dto.projectId = this.projectId
        this.getData()
    }

    async getData() {
        this.data = await this.projectEvaluationService.list(this.dto)
    }

    // async openDetailModal(inspectionsListItem: InspectionsListItem) {
    //     this.modal.create({
    //         title: `巡检报告详情`,
    //         componentParams: { inspectionsListItem },
    //         content: InspectionDetailModalComponent,
    //         width: 1000,
    //         footer: false
    //     })
    // }
}
