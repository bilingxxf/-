import { Component, OnInit, Input } from '@angular/core'
import { ProjectService } from '@core/project/project.service'
import { ProjectCustomerInfo } from '@core/project/project-customer-info'

@Component({
    selector: 'app-project-customer-detail',
    templateUrl: './project-customer-detail.component.html',
})
export class ProjectCustomerDetailComponent implements OnInit {

    @Input() projectId: number

    customerInfo = new ProjectCustomerInfo()

    constructor(
        private projectService: ProjectService
    ) { }

    async ngOnInit() {
        this.customerInfo = await this.projectService.getProjectCustomerDetail(this.projectId)
    }

}
