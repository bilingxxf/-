import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { EnclosureQueryDto } from '@core/enclosure/enclosure-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { EnclosureWithPrice } from '../../../../core/enclosure/enclosure-with-price'
import { ProductService } from '@core/product/product.service'
import { EnclosureService } from '../../../../core/enclosure/enclosure.service'
import { ProductSetPriceDto } from '@core/product/product-set-price-dto'
import { EnclosureBusinessEntrySummary } from '../../../../core/enclosure/enclosure-business-entry-summary'
import { PermissionService } from '../../../../core/permission/permission.service'


@Component({
  selector: 'app-enclosure-business-entry-table',
  templateUrl: './enclosure-business-entry-table.component.html',
})
export class EnclosureBusinessEntryTableComponent implements OnInit {
    _monomerId: number
    @Input() 
    set monomerId(val) {
        // console.log(val,'momoner-------')
        this._monomerId = val
        this.dto.monomerId = val
        this.dto.page = 1
        if(this.area)  this.getData()
    }

    get monomerId() {
        return this._monomerId
    }

    _area: any
    @Input() 
    set area(val) {
        // console.log(val, 'types-------------')
        this._area = val;
        this.dto.page =1
        this.getData()
    }

    get area() {
        return this._area;
    }

    @Output() priceChange = new EventEmitter<void>()

    summary = new EnclosureBusinessEntrySummary()

    dto = new EnclosureQueryDto()

    data = new PagingData<EnclosureWithPrice>()
    hasEdit = false

    isSpinning:boolean = false

    constructor(
        private productService: ProductService,
        private enclosureService: EnclosureService,
        public  permissionService: PermissionService

    ) { }

    async ngOnInit() {
        this.dto.monomerId = this.monomerId;
        this.hasEdit = await this.permissionService.hasPermission(1028)
        // this.getData()
    }

    search() {
        // this.dto.name = value
        this.dto.page = 1
        this.getData()
    }

    async getData() {
        this.isSpinning = true
        this.dto.monomerId = this.monomerId
        try {
            if(this.area.id === 1) {
                console.log('围护初始化------商务录入----------')
                this.data = await this.enclosureService.listWithPrice(this.dto)
            }else {
                console.log('围护初始化-----安装商务跟踪----------------')
                this.data = await this.enclosureService.listQuickWithPrice(this.dto)
            }
            
            
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
        // this.getSummary()
    }

    async setPrice(item: EnclosureWithPrice) {
        const dto = new ProductSetPriceDto()
        dto.name = item.name
        dto.monomerId = item.monomerId
        dto.finishedProductPrice = item.finishedProductPrice 
        // dto.unitFixPrice = item.unitFixPrice 
        dto.color = item.color
        dto.modelNum = item.modelNum
        dto.thickness = item.thickness
        console.log(dto, '选择之后的价格------------')
        if (!dto.finishedProductPrice) return
        await this.productService.setContainPrice(dto)
        // this.getSummary() // 重新获取合计
        this.priceChange.emit() // 通知父组件，价格变了
    }

    async getSummary() {
        this.summary = await this.enclosureService.getBusinessEntrySummary(this.monomerId) // 汇总合计
    }

    copy(index: number, isFix = false) {
        if (isFix) {
            this.data.data[index].unitFixPrice = this.data.data[index - 1].unitFixPrice
        } else {
            this.data.data[index].finishedProductPrice = this.data.data[index - 1].finishedProductPrice
        }
    }
}
