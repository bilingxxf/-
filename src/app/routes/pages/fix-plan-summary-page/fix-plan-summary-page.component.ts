import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '@core/monomer/monomer.service'
import { AreaDivision } from '@core/plan/area-division'
import { PlanService } from '@core/plan/plan.service'
import { ProductTypes } from 'app/constant/product-types.enum'

@Component({
    selector: 'app-fix-plan-summary-page',
    templateUrl: './fix-plan-summary-page.component.html',
  })
  export class FixPlanSummaryPageComponent implements OnInit {

    projectId: number

    productTypes = ProductTypes

    pageMonomers: PageMonomer[] = []

    currentMonomers = new PageMonomer()

    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private planService: PlanService
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        const monomers = await this.monomerService.getByProjectId(this.projectId)
        this.pageMonomers = await Promise.all(monomers.map(async monomer => {
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            return {
                monomer, areas
            }
        }))
        this.currentMonomers = this.pageMonomers[0]
    }

}

class PageMonomer {
    monomer: Monomer

    areas: AreaDivision[] = []
}
