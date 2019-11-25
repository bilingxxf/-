import { Component, OnInit, Input } from '@angular/core'
import { WarehouseOutQueryDto } from '../../../../core/warehouse-out/warehouse-out-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehouseOutItem } from '../../../../core/warehouse-out/warehouse-out-item'
import { Box } from '@shared/component/multi-color-box-list/box'
import { WarehouseOutService } from '../../../../core/warehouse-out/warehouse-out.service'
import { WarehousingQueryDto } from '../../../../core/warehousing/warehousing-query-dto'

@Component({
  selector: 'app-monomer-warehousing-out',
  templateUrl: './monomer-warehousing-out.component.html',
})
export class MonomerWarehousingOutComponent implements OnInit {
    @Input() monomerId: number

    dto = new WarehousingQueryDto()

    data = new PagingData<WarehouseOutItem>()

    totalData: WarehouseOutItem[] = []

    boxs: Box[] = []

    constructor(
        private warehouseOutService: WarehouseOutService
    ) { }

    async ngOnInit() {
        this.getData()
        this.totalData = await this.warehouseOutService.getAll(this.monomerId)
        this.boxs = this.totalData.map(o => {
           return {
                tooltip: `${o.name} ${o.serialNo},出库数量: ${o.totalQuantity}, 工地实收: ${o.receiptQuantity}`,
                content: `${o.name} * ${o.serialNo}`,
                areas: [{
                    color: 'green',
                    percent: o.recordQuantity / o.totalQuantity,
                }]
            } as any
        })
    }

    async getData() {
        this.dto.monomerId = this.monomerId
        this.data = await this.warehouseOutService.list(this.dto)
    }
}
