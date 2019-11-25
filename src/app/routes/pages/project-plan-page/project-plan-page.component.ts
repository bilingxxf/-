import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MonomerService } from '@core/monomer/monomer.service'
import { PlanService } from '@core/plan/plan.service'

@Component({
  selector: 'app-project-plan-page',
  templateUrl: './project-plan-page.component.html',
})
export class ProjectPlanPageComponent implements OnInit {

    projectId: number
    pageMonomers: any[] = []
    currentMonomers: any

    active = 1;

    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private planService: PlanService,
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = +id)
        const monomers = await this.monomerService.getByProjectId(this.projectId)
        this.pageMonomers = await Promise.all(monomers.map(async monomer => {
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            return { monomer, areas }
        }))
        this.currentMonomers = this.pageMonomers[0] 
    }

}
