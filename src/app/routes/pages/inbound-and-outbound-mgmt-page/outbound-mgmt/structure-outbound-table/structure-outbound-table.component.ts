import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { WarehousingQueryDto } from '@core/warehousing/warehousing-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingDateItem } from '@core/warehousing/warehousing-date-item'
import { WarehousingService } from '@core/warehousing/warehousing.service'
import { WarehouseType } from '../../../../../constant/warehouse-type.enum'

@Component({
  selector: 'app-structure-outbound-table',
  templateUrl: './structure-outbound-table.component.html',
})
export class StructureOutboundTableComponent implements OnInit {

    date = new Date()

    @Input() monomerId: number

    dto = new WarehousingQueryDto()

    data: any = []

    constructor(
        private warehousingService: WarehousingService
    ) { }

    async ngOnInit() {
        this.dto.monomerId = this.monomerId
        this.dto.warehouseType = WarehouseType.出库
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
