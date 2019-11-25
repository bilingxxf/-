import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'
import { PagingData } from '@core/common-entity/paging-data'
import { CargoList } from '@core/cargo-list/cargo-list'
import { CargoListQueryDto } from '@core/cargo-list/cargo-list-query-dto'
import { CargoListService } from '@core/cargo-list/cargo-list.service'
import { NzModalService } from '../../../../../../node_modules/ng-zorro-antd'
import { CargoListDetailModalComponent } from '../../cargo-list-mgmt-page/cargo-list-detail-modal/cargo-list-detail-modal.component'



@Component({
  selector: 'app-receipt-daily-table',
  templateUrl: './receipt-daily-table.component.html',
})
export class ReceiptDailyTableComponent implements OnInit {

    @Input() projectId: number
    @Input() date: string

    data = new PagingData<CargoList>()

    dto = new CargoListQueryDto()

    constructor(
        private cargoListService: CargoListService,
        private modal: NzModalService,
        private location: Location
    ) { }

    async ngOnInit() {
        this.dto.projectId = this.projectId;
        this.dto.receiptDate = this.date;
        this.getData()
    }

    async getData() {
        this.data = await this.cargoListService.getReceiptData(this.dto)
        console.log(this.data.data,12313213)
    }

    openDetailModal(id: number) {
        this.modal.create({
            nzTitle: `清单详情`,
            nzWidth: 1000,
            nzContent: CargoListDetailModalComponent,
            nzComponentParams: { id },
            nzMaskClosable: false,
            nzOnOk: async () => {
                this.getData()
            },
            nzFooter: null
        })
    }

    exportExcel(id: number) {
        window.open(`/api/cargoLists/${id}/actions/export`);
    }
}
