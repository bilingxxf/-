import { Component, OnInit, Input } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd'
import { CargoListDetail } from '../../../../core/cargo-list/cargo-list-detail'
import { CargoListService } from '../../../../core/cargo-list/cargo-list.service'
import { CarInListQueryDto } from '@core/cargo-list/carIn-list-query-dto'

@Component({
  selector: 'app-cargo-list-detail-modal',
  templateUrl: './cargo-list-detail-modal.component.html',
})
export class CarInListDetailModalComponent implements OnInit {

    @Input() id: number
    @Input() queryDate: number

    dto = new CarInListQueryDto()

    cargoListDetail = new CargoListDetail()

    isSpinning:boolean = false

    constructor(
        private subject: NzModalRef,
        private cargoListService: CargoListService
    ) { }

    ngOnInit() {
        this.fetchList()
        // console.log(this.cargoListDetail,'入库详情信息')
    }

    async fetchList() {
        this.isSpinning = true
        try {
            this.dto.monomerId = this.id
            this.dto.queryDate = this.queryDate
            this.dto.warehouseType = 0
            this.dto.productType = 1
            this.cargoListDetail = await this.cargoListService.inDetail(this.dto)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    cancel() {
        this.subject.triggerCancel();
    }
}
