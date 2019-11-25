import { Component, OnInit, Input } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd'
import { CargoListDetail } from '@core/cargo-list/cargo-list-detail'
import { CargoListService } from '@core/cargo-list/cargo-list.service'
import { CarInListQueryDto } from '@core/cargo-list/carIn-list-query-dto'

@Component({
  selector: 'app-inbound-encl-detail-modal',
  templateUrl: './inbound-encl-detail-modal.component.html',
})
export class InboundEnclDetailModalComponent implements OnInit {

  @Input() id: number
  @Input() queryDate: number

  dto = new CarInListQueryDto()

  cargoListDetail = new CargoListDetail()

  isSpinning:boolean = false

  constructor(
      private subject: NzModalRef,
      private cargoListService: CargoListService
  ) {}

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
        this.dto.productType = 2
        this.cargoListDetail = await this.cargoListService.enclInDetail(this.dto)
        this.cargoListDetail.data.forEach(v => {
          v.stockLength = v.stockQuantity && v.productInfo.length ? (v.stockQuantity * v.productInfo.length).toFixed(0) : 0
          v.stockArea = v.stockQuantity && v.productInfo.length ? (v.stockQuantity * v.productInfo.width * v.productInfo.length / 1000000).toFixed(2):0
        })
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
