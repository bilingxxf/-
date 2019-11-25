import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ProductService } from '../../../../core/product/product.service'
import { PagingData } from '@core/common-entity/paging-data'
import { ComponentQueryDto } from '../../../../core/product/component-query-dto'
import { ProductComponentWithPrice } from '@core/product/product-component-with-price'
import { ProductSetPriceDto } from '../../../../core/product/product-set-price-dto'
import { AreaDivision } from '../../../../core/plan/area-division'
import { PermissionService } from '../../../../core/permission/permission.service'


@Component({
  selector: 'app-component-business-entry-table',
  templateUrl: './component-business-entry-table.component.html',
})
export class ComponentBusinessEntryTableComponent implements OnInit {

    _monomerId: number // 单体id
    @Input() 
    set monomerId(val) {
        this._monomerId = val
        this.dto.monomerId = val
        this.dto.page = 1
        if(this.area) this.getData()
    }
    get monomerId() {
        return this._monomerId
    }

    _area: any  // 区域  类型
    @Input() 
    set area(val) {
        this._area = val;
        this.dto.page =1
        this.getData()
    }
    get area() {
        return this._area;
    }

    
    @Output() priceChange = new EventEmitter<void>()

    dto = new ComponentQueryDto

    data = new PagingData<ProductComponentWithPrice>()
    hasEdit: boolean = false

    isSpinning:boolean = false

    constructor(
        private productService: ProductService,
        public  permissionService: PermissionService
    ) { }

    search() {
        this.dto.page = 1
        this.getData()
    }

    async ngOnInit() {
        
        this.hasEdit = await this.permissionService.hasPermission(1028)
        // this.getData()
    }

    async getData() {
        this.isSpinning = true
        try {
            // this.dto.areaDivisionId = this.area.id
            this.dto.monomerId = this.monomerId            
            if(this.area.id == 1) {
                console.log('结构初始化-----商务录入----------', this.dto.monomerId )
                this.data = await this.productService.listComponentForBusinessEntry(this.dto)
            }else {
                console.log('结构初始化-----安装跟踪----------', this.dto.monomerId )
                this.data = await this.productService.listComponentQuickBusinessEntry(this.dto)
            }
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    async setPrice(item: ProductComponentWithPrice) {
        const dto = new ProductSetPriceDto()
        console.log(item)
        dto.monomerId = item.monomerId
        dto.name = item.name
        dto.material = item.material
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
