import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '@core/monomer/monomer.service'
import { PlanService } from '@core/plan/plan.service'



@Component({
  selector: 'app-quality-mgmt-page',
  templateUrl: './quality-mgmt-page.component.html',
})
export class QualityMgmtPageComponent implements OnInit {

    projectId: number

    currentMonomers: PageMonomer;
    pageMonomers: PageMonomer[] = []
    showMonomer = true;

    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private planService: PlanService,
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        const monomers = await this.monomerService.getByProjectId(this.projectId)
        this.pageMonomers = await Promise.all(monomers.map(async monomer => {
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            return { monomer, areas }
        }))
        this.currentMonomers = this.pageMonomers[0] 
    }

}

class PageMonomer {
    monomer: Monomer

    areas: any[] = []
}

