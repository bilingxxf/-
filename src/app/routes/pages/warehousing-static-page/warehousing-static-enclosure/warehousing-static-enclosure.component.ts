import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { WarehousingFixStaticReqDto } from '@core/warehousing-fix-static/warehousing-fix-static-req-dto'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { ScanTypes } from '../../../../constant/scan-types.enum'
import { WarehousingFixStaticService } from '../../../../core/warehousing-fix-static/warehousing-fix-static.service'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingFixStatic } from '@core/warehousing-fix-static/warehousing-fix-static'
import { ReceiptStaticTotal } from '@core/warehousing-fix-static/receipt-static-total'

@Component({
  selector: 'app-warehousing-static-enclosure',
  templateUrl: './warehousing-static-enclosure.component.html',
})
export class WarehousingStaticEnclosureComponent implements OnInit {

    @Input() projectId: number

    dto = new WarehousingFixStaticReqDto()

    data = new PagingData<WarehousingFixStatic>()

    date = new Date()

    total = new ReceiptStaticTotal()

    constructor(
        private warehousingFixStaticService: WarehousingFixStaticService
    ) { }

    ngOnInit() {
        this.dto.projectId = this.projectId
        this.dto.productType = ProductTypes.围护
        this.dto.scanType = ScanTypes.收货
        this.getData()
        this.getTotal()
    }

    async getData() {
        this.data = await this.warehousingFixStaticService.getStaticData(this.dto)
    }

    async getTotal() {
        this.total = await this.warehousingFixStaticService.getReceiptStaticTotal(this.dto)
    }

    search() {
        this.dto.setDate(this.date)
        this.dto.page = 1
        this.getData()
        this.getTotal()
    }
}
