import { Component, OnInit, Input } from '@angular/core'
import { ProductQualityQueryDto } from '@core/product/product-quality-query-dto'
import { ProductQualityItem } from '@core/product/product-quality-item'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductService } from '@core/product/product.service'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../constant/component-colors.enum';

@Component({
  selector: 'app-enclosure-quality-board-table',
  templateUrl: './enclosure-quality-board-table.component.html',
})
export class EnclosureQualityBoardTableComponent implements OnInit {

    _monomerId: number
    @Input()
    set monomerId(val) {
        this.dto.monomerId = val;
        this._monomerId = val;
        this.getData()
    }
    get monomerId() {
        return this._monomerId
    }

    dto = new ProductQualityQueryDto()

    data = new PagingData<ProductQualityItem>()

    ProductStatus = ProductStatus;
    ComponentColors = ComponentColors;

    isSpinning:boolean = false
    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        // this.dto.monomerId = this.monomerId
        // this.getData()
    }

    async getData() {
        this.isSpinning = true
        this.dto.type = ProductTypes.围护
        this.data = await this.productService.getProductQuality(this.dto)
        this.isSpinning = false
    }

    search() {
        this.dto.page = 1
        this.getData()
    }

}
