import { Component, OnInit, Input } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd'
import { CargoListDetail } from '../../../../core/cargo-list/cargo-list-detail'
import { CargoListService } from '../../../../core/cargo-list/cargo-list.service'
import { CarInListQueryDto } from '@core/cargo-list/carIn-list-query-dto'

@Component({
  selector: 'app-carIn-list-detail-by-user-modal',
  templateUrl: './carIn-list-detail-by-user-modal.component.html',
})
export class CarInListDetailByUserModalComponent implements OnInit {

    @Input() id: number
    @Input() queryDate: number

    dto = new CarInListQueryDto()

    cargoListDetail = new CargoListDetail()

    constructor(
        private subject: NzModalRef,
        private cargoListService: CargoListService
    ) { }

    async ngOnInit() {
        this.dto.monomerId = this.id
        this.dto.queryDate = this.queryDate
        this.dto.warehouseType = 0
        this.dto.productType = 1
        this.cargoListDetail = await this.cargoListService.fetchDetailByOperator(this.dto)
        // console.log(this.cargoListDetail,'入库详情信息')
    } 

    cancel() {
        this.subject.triggerCancel();
    }
}
