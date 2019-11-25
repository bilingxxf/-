import { Component, OnInit, Input } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd'
import { CargoListDetail } from '../../../../core/cargo-list/cargo-list-detail'
import { CargoListService } from '../../../../core/cargo-list/cargo-list.service'

@Component({
  selector: 'app-cargo-list-detail-modal',
  templateUrl: './cargo-list-detail-modal.component.html',
})
export class CargoListDetailModalComponent implements OnInit {

    @Input() id: number

    cargoListDetail = new CargoListDetail()

    isSpinning:boolean = false

    constructor(
        private subject: NzModalRef,
        private cargoListService: CargoListService
    ) { }

    async ngOnInit() {
        this.isSpinning = true
        try {
            this.cargoListDetail = await this.cargoListService.fetchShippingDetail(this.id)
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
