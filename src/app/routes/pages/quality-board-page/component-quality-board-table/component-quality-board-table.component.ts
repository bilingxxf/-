import { Component, OnInit, Input } from '@angular/core'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductService } from '../../../../core/product/product.service'
import { ProductQualityQueryDto } from '../../../../core/product/product-quality-query-dto'
import { ProductQualityItem } from '@core/product/product-quality-item'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../constant/component-colors.enum';

@Component({
  selector: 'app-component-quality-board-table',
  templateUrl: './component-quality-board-table.component.html',
})
export class ComponentQualityBoardTableComponent implements OnInit {

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

    boxs: Box[] = []

    ProductStatus = ProductStatus;
    ComponentColors = ComponentColors;

    isSpinning:boolean = false

    constructor(
        private productService: ProductService
    ) { }

    async ngOnInit() {
    }

    search() {
        this.dto.page = 1
        this.getData()
    }

    async getData() {
        // this.dto.serialNo = searchStr
        this.isSpinning = true
        try {
            this.data = await this.productService.getProductQuality(this.dto)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
//				this.data = await this.productService.list(this.dto)
    }
}
