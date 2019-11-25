import { Component, OnInit, Input } from '@angular/core'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { ProductDemandQueryDto } from '@core/product-demand/product-demand-query-dto'
import { ProductDemandService } from '../../../../core/product-demand/product-demand.service'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductDemandPlanListItem } from '@core/product-demand/product-demand-plan-list-item'
import { ProductDemandPriority } from '../../../../constant/product-demand-priority.enum'

@Component({
  selector: 'app-product-demand-plan-summary-table',
  templateUrl: './product-demand-plan-summary-table.component.html',
})
export class ProductDemandPlanSummaryTableComponent implements OnInit {

    @Input() areaId: number

    @Input() productType = ProductTypes.结构

    productDemandPriority = ProductDemandPriority

    dto = new ProductDemandQueryDto()

    data = new PagingData<ProductDemandPlanListItem>()

    constructor(
        private productDemandService: ProductDemandService
    ) { }

    async ngOnInit() {
        this.dto.areaDivisionId = this.areaId
        this.dto.productType = this.productType
        this.getData()
    }

    async getData() {
        this.data = await this.productDemandService.productDemandPlanList(this.dto)
    }

}
