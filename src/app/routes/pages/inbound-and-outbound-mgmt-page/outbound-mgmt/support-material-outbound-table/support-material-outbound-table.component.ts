import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { WarehousingQueryDto } from '@core/warehousing/warehousing-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingDateItem } from '@core/warehousing/warehousing-date-item'
import { WarehousingService } from '@core/warehousing/warehousing.service'
import { ProductTypes } from '../../../../../constant/product-types.enum'
import { WarehouseType } from '../../../../../constant/warehouse-type.enum'

@Component({
  selector: 'app-support-material-outbound-table',
  templateUrl: './support-material-outbound-table.component.html',
})
export class SupportMaterialOutboundTableComponent implements OnInit {

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
        this.dto.warehouseType = WarehouseType.出库
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
