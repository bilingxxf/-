import { Component, OnInit, Input } from '@angular/core'
import { ProductivityQueryDto } from '../../../../../../core/productivity/productivity-query-dto'
import { ProductTypes } from '../../../../../../constant/product-types.enum'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductivityListItem } from '../../../../../../core/productivity/productivity-list-item'
import { ProductivityService } from '../../../../../../core/productivity/productivity.service'

@Component({
  selector: 'app-productivity-static-structure-table',
  templateUrl: './productivity-static-structure-table.component.html', 
})
export class ProductivityStaticStructureTableComponent implements OnInit {

    date = new Date()

    styleList:any

    _monomerId: number
    @Input()
    set monomerId(val) {
        this._monomerId = val;
        this.dto.page =1
        this.getData()
    }
    get monomerId() {
        return this._monomerId
    }

    dto = new ProductivityQueryDto(ProductTypes.结构)

    data = new PagingData<ProductivityListItem>()

    isSpinning:boolean = false

    constructor(
        private productivityService: ProductivityService
    ) { }

    async ngOnInit() {
        // this.getData()
        this.styleList = [{
            name: '全部',
            id: ''
        },{
            name: '总装',
            id: 0
        }, {
            name: '总装检验',
            id: 1
        }, {
            name: '涂装',
            id: 2
        }, {
            name: '涂装检验',
            id: 3
        }]
    }

    async getData() {
        this.isSpinning = true
        try {
            this.dto.monomerId = this.monomerId
            this.data = await this.productivityService.list(this.dto)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    searchHandle() {
        console.log(this.dto.status, '状态')
    }

    search() {
        // console.log('rrrr')
        // this.dto.setDate(value)
        this.dto.page = 1
        this.getData()
    }

}
