import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PagingData } from '../../../core/common-entity/paging-data'
import { CargoList } from '@core/cargo-list/cargo-list'
import { CargoListService } from '../../../core/cargo-list/cargo-list.service'
import { CargoListQueryDto } from '../../../core/cargo-list/cargo-list-query-dto'
import { NzModalService } from 'ng-zorro-antd'
import { CargoListDetailModalComponent } from './cargo-list-detail-modal/cargo-list-detail-modal.component'

@Component({
  selector: 'app-cargo-list-mgmt-page',
  templateUrl: './cargo-list-mgmt-page.component.html',
})
export class CargoListMgmtPageComponent implements OnInit {

    data = new PagingData<CargoList>()

    dto = new CargoListQueryDto()

    constructor(
        private route: ActivatedRoute,
        private cargoListService: CargoListService,
        private modal: NzModalService
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(async o => {
            this.dto.projectId = o.id
            this.getData()
        })
    }

    async getData() {
        this.data = await this.cargoListService.list(this.dto)
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
}
