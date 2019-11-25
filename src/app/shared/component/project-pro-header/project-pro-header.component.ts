import { Component, OnInit, Input } from '@angular/core'
import { ProjectService } from '../../../core/project/project.service'
import { Project } from '@core/project/project'

@Component({
  selector: 'app-project-pro-header',
  templateUrl: './project-pro-header.component.html',
})
export class ProjectProHeaderComponent implements OnInit {

    project = new Project()

    @Input() projectId: number
    @Input() showCalendar: Boolean = false
    @Input() remainNumber: number
    constructor(
        private projectService: ProjectService
    ) { }

    async ngOnInit() {
        this.project =  await this.projectService.getProjectInfoDetail(this.projectId)
    }

}
