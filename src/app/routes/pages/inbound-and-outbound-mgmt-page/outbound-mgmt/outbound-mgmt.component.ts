import { Component, OnInit, Input } from '@angular/core'
import { MonomerService } from '@core/monomer/monomer.service'
import { Monomer } from '@core/monomer/monomer'

@Component({
  selector: 'app-outbound-mgmt',
  templateUrl: './outbound-mgmt.component.html',
})
export class OutboundMgmtComponent implements OnInit {

    @Input() projectId: number

    monomers: Monomer[] = []

    @Input() pageMonomers: any[]

    constructor(
        private monomerService: MonomerService,
    ) { }

    async ngOnInit() {
        this.monomers = await this.monomerService.getByProjectId(this.projectId)
    }
}
