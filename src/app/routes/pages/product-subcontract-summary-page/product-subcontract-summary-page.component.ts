import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ProductSubcontractDetail } from '@core/product-subcontract/product-subcontract-detail'
import { MonomerService } from '@core/monomer/monomer.service'
import { ProductSubcontractService } from '@core/product-subcontract/product-subcontract.service'
import { ActivatedRoute } from '@angular/router'
import { PlanService } from '@core/plan/plan.service'
import { ProductTypes } from 'app/constant/product-types.enum'

@Component({
  selector: 'app-product-subcontract-summary-page',
  templateUrl: './product-subcontract-summary-page.component.html',
})
export class ProductSubcontractSummaryPageComponent implements OnInit {

    productTypes = ProductTypes

    projectId: number

    pageMonomers: PageMonomer[] = []

    currentMonomers = new PageMonomer()

    constructor(
        private monomerService: MonomerService,
        public productSubcontractService: ProductSubcontractService,
        private planService: PlanService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        const monomers = await this.monomerService.getByProjectId(this.projectId)
        this.pageMonomers = await Promise.all(monomers.map(async monomer => {
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            const enclosureSubcontractDetail = await this.productSubcontractService.getProductSubcontract(monomer.id, ProductTypes.围护)
            const supportMaterialSubcontractDetail = await this.productSubcontractService.getProductSubcontract(monomer.id, ProductTypes.辅材)
            return {
                monomer,
                supportMaterialSubcontractDetail,
                enclosureSubcontractDetail,
                areas: await Promise.all(areas.map(async area => ({
                    area,
                    subcontractDetail: await this.productSubcontractService.getProductSubcontract(area.id, ProductTypes.结构)
                })))
            }
        }))
        this.currentMonomers = this.pageMonomers[0]
    }

}

class PageMonomer {
    monomer: Monomer

    enclosureSubcontractDetail: ProductSubcontractDetail[]

    supportMaterialSubcontractDetail: ProductSubcontractDetail[]

    areas: {
        area: AreaDivision,
        subcontractDetail: ProductSubcontractDetail[]
    }[] = []
}
