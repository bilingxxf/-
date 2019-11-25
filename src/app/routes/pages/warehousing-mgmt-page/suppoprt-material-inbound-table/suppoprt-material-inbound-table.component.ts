import { Component, OnInit, Input } from '@angular/core'
import { WarehousingService } from '../../../../core/warehousing/warehousing.service'
import { WarehousingQueryDto } from '../../../../core/warehousing/warehousing-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingDateItem } from '@core/warehousing/warehousing-date-item'
import { ProductTypes } from '../../../../constant/product-types.enum'

@Component({
  selector: 'app-suppoprt-material-inbound-table',
  templateUrl: './suppoprt-material-inbound-table.component.html',
})
export class SuppoprtMaterialInboundTableComponent implements OnInit {

    date = new Date()

    @Input() monomerId: number

    dto = new WarehousingQueryDto()

    data: any = []

    constructor(
        private warehousingService: WarehousingService
    ) { }

    ngOnInit() {
        this.dto.productType = ProductTypes.辅材
        this.dto.monomerId = this.monomerId
        this.getData()
    }

    async getData() {
        this.data = await this.warehousingService.listByDate(this.dto)
    }

    search(value: Date) {
        this.dto.setDate(value)
        this.dto.page = 1
        this.getData()
    }
}
