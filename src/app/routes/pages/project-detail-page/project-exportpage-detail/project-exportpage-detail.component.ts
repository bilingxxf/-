import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { Project } from '@core/project/project'
import { ProjectService } from '../../../../core/project/project.service'
import { MARGIN_TYPES } from '../../../../constant/margin-types.enum'
import { ORDER_TYPES } from '../../../../constant/order-types.enum'
import { STRUCT_TYPES } from '../../../../constant/struct-types.enum'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '../../../../core/monomer/monomer.service'

@Component({
  selector: 'app-project-exportpage-detail',
  templateUrl: './project-exportpage-detail.component.html',
})
export class ProjectExportPageDetailComponent implements OnInit {

    @Input() projectId: number

    marginTypes = MARGIN_TYPES

    structTypes = STRUCT_TYPES

    orderTypes = ORDER_TYPES

    monomers: Monomer[] = []

    project = new Project()

    constructor(
        private projectService: ProjectService,
        private monomerService: MonomerService
    ) { }

    async ngOnInit() {
        this.project = await this.projectService.getProjectInfoDetail(this.projectId)
        this.monomers = await this.monomerService.getByProjectId(this.projectId)
    }

}
