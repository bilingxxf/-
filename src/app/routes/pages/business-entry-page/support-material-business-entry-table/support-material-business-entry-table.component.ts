import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { SupportMaterialQueryDto } from '../../../../core/support-material/support-material-query-dto'
import { SupportMaterialWithPrice } from '@core/support-material/support-material-with-price'
import { PagingData } from '@core/common-entity/paging-data'
import { SupportMaterialService } from '../../../../core/support-material/support-material.service'
import { ProductSetPriceDto } from '@core/product/product-set-price-dto'
import { ProductService } from '../../../../core/product/product.service'

@Component({
  selector: 'app-support-material-business-entry-table',
  templateUrl: './support-material-business-entry-table.component.html',
})
export class SupportMaterialBusinessEntryTableComponent implements OnInit {

    @Input() monomerId: number

    @Output() priceChange = new EventEmitter<void>()

    dto = new SupportMaterialQueryDto()

    data = new PagingData<SupportMaterialWithPrice>()

    isSpinning:boolean = false

    constructor(
        private supportMaterialService: SupportMaterialService,
        private productService: ProductService
    ) { }

    search() {
        // this.dto.name = value
        this.dto.page = 1
        this.getData()
    }

    ngOnInit() {
        this.dto.monomerId = this.monomerId
        this.getData()
    }

    async getData() {
        this.isSpinning = true
        try {
            this.data = await this.supportMaterialService.listWithPrice(this.dto)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    async setPrice(item: SupportMaterialWithPrice) {
        const dto = new ProductSetPriceDto()
        dto.areaDivisionId = item.id
        dto.finishedProductPrice = item.finishedProductPrice || undefined
        dto.unitFixPrice = item.unitFixPrice || undefined
        if (!dto.finishedProductPrice && !dto.unitFixPrice) return
        await this.productService.setPrice(dto)
        this.priceChange.emit() // 通知父组件，价格变了
    }

    copy(index: number, isFix = false) {
        if (isFix) {
            this.data.data[index].unitFixPrice = this.data.data[index - 1].unitFixPrice
        } else {
            this.data.data[index].finishedProductPrice = this.data.data[index - 1].finishedProductPrice
        }
    }

}
