import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MonomerService } from '@core/monomer/monomer.service'
import { PlanService } from '@core/plan/plan.service'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ProjectService } from '@core/project/project.service'

@Component({
  selector: 'app-finished-product-receipt-and-fix-static-page',
  templateUrl: './finished-product-receipt-and-fix-static-page.component.html',
})
export class FinishedProductReceiptAndFixStaticPageComponent implements OnInit {

    projectId: number

    pageMonomers: any[] = []

    _currentMonomers
    set currentMonomers(val) {
        this._currentMonomers = val;
        this.getData()
    }

    get currentMonomers() {
        return this._currentMonomers;
    }
    areas: any = []
    remainNumber: any
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
        console.log(this.pageMonomers);
        this.currentMonomers = this.pageMonomers[0]
        
    }
    async getData() {
        let dto ={
            type: 3,
            monomerId: this.currentMonomers.monomer.id
        }
        this.remainNumber = await this.planService.remainNumber(dto)
        this.remainNumber = this.remainNumber !== null ? this.remainNumber: '--'
    }
}
