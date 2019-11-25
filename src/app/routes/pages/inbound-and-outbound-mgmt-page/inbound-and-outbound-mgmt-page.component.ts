import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PlanService } from '@core/plan/plan.service'
import { MonomerService } from '@core/monomer/monomer.service'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ProjectService } from '@core/project/project.service'



@Component({
  selector: 'app-inbound-and-outbound-mgmt-page',
  templateUrl: './inbound-and-outbound-mgmt-page.component.html',
})
export class InboundAndOutboundMgmtPageComponent implements OnInit {
    projectId: number
    monomerId: number
    currentMonomers: Monomer
    pageMonomers: PageMonomer[] = []
    monomers: Monomer[];

    active: number = 1;
    

    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private planService: PlanService,
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        this.monomerId = 1
        this.monomers = await this.monomerService.getByProjectId(this.projectId)
        this.currentMonomers = this.monomers[0];
        // console.log(this.currentMonomers,'出库信息')
        // this.pageMonomers = await Promise.all(this.monomers.map(async monomer => {
        //     const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
        //     return { monomer, areas }
        // }))
        // console.log(this.pageMonomers[0],1000)
        // this.currentMonomers = this.pageMonomers;
    }
}

class PageMonomer {
    monomer: Monomer
    areas: AreaDivision[] = []
}
