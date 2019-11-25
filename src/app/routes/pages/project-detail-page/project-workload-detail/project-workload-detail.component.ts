import { Component, OnInit, Input } from '@angular/core'
import { ProjectWorkloadService } from '../../../../core/project-workload/project-workload.service'
import { MonomerWithWorkload } from '@core/project-workload/monomer-with-workload'

@Component({
  selector: 'app-project-workload-detail',
  templateUrl: './project-workload-detail.component.html',
})
export class ProjectWorkloadDetailComponent implements OnInit {

    @Input() projectId: number

    monomers: MonomerWithWorkload[] = []

    currentMonomers: MonomerWithWorkload

    constructor(
        private projectWorkloadService: ProjectWorkloadService
    ) { }

    async ngOnInit() {
        this.monomers = await this.projectWorkloadService.getProjectWorkloads(this.projectId)
        this.currentMonomers = this.monomers[0];
    }

}
