import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '@core/monomer/monomer.service'
import { ActivatedRoute } from '@angular/router'
import { PlanService } from '@core/plan/plan.service'

@Component({
  selector: 'app-warehousing-out-mgmt-page',
  templateUrl: './warehousing-out-mgmt-page.component.html',
})
export class WarehousingOutMgmtPageComponent implements OnInit {
    projectId: number

    monomers: Monomer[] = []

    currentMonomers = new Monomer()

    constructor(
        private monomerService: MonomerService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        this.monomers = await this.monomerService.getByProjectId(this.projectId)
        console.log(this.projectId,'denghuazhang')
        this.currentMonomers = this.monomers[0]
    }
}
