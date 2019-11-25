import { Component, OnInit, Input } from '@angular/core'
import { WarehousingService } from '../../../../core/warehousing/warehousing.service'
import { WarehousingQueryDto } from '../../../../core/warehousing/warehousing-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingDateItem } from '@core/warehousing/warehousing-date-item'
import { ProductTypes } from '../../../../constant/product-types.enum'

@Component({
  selector: 'app-enclosure-inbound-table',
  templateUrl: './enclosure-inbound-table.component.html',
})
export class EnclosureInboundTableComponent implements OnInit {

    date = new Date()

    @Input() monomerId: number

    dto = new WarehousingQueryDto()

    data: any = []
    constructor(
        private warehousingService: WarehousingService
    ) { }

    async ngOnInit() {
        this.dto.productType = ProductTypes.围护
        this.dto.monomerId = this.monomerId
        this.getData()
        // this.totalData = await this.warehousingService.getAll(this.monomerId)
        // this.boxs = this.totalData.map(o => ({
        //     tooltip: `${o.name} ${o.serialNo},总数: ${o.totalQuantity}, 入库数: ${o.recordQuantity}`,
        //     content: `${o.name} * ${o.serialNo}`,
        //     areas: [{
        //         color: Colors[3],
        //         percent: o.recordQuantity / o.totalQuantity,
        //     }]
        // }))
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
