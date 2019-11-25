import { Component, OnInit, Input } from '@angular/core'
import { ProductivityQueryDto } from '../../../../../../core/productivity/productivity-query-dto'
import { ProductTypes } from '../../../../../../constant/product-types.enum'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductivityListItem } from '../../../../../../core/productivity/productivity-list-item'
import { ProductivityService } from '../../../../../../core/productivity/productivity.service'

@Component({
  selector: 'app-productivity-static-enclosure-table',
  templateUrl: './productivity-static-enclosure-table.component.html',
})
export class ProductivityStaticEnclosureTableComponent implements OnInit {

    date = new Date()

    _monomerId: number

    @Input()
    set monomerId(val) {
        this._monomerId = val;
        this.getData()
    }
    get monomerId() {
        return this._monomerId
    }

    dto = new ProductivityQueryDto(ProductTypes.围护)

    data = new PagingData<ProductivityListItem>()


    constructor(
        private productivityService: ProductivityService
    ) { }

    async ngOnInit() {
        // this.getData()
    }

    async getData() {
        this.dto.monomerId = this.monomerId
        this.data = await this.productivityService.list(this.dto)
    }

    search(value: Date) {
        this.dto.setDate(value)
        this.dto.page = 1
        this.getData()
    }

}
