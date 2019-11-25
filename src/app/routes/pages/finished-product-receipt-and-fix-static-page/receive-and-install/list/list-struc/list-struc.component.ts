import { Component, OnInit, Input } from '@angular/core'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductTypes } from '../../../../../../constant/product-types.enum'
import { WarehousingFixStaticReqDto } from '@core/warehousing-fix-static/warehousing-fix-static-req-dto'
import { WarehousingFixStaticService } from '@core/warehousing-fix-static/warehousing-fix-static.service'

@Component({
    selector: 'app-list-struc',
    templateUrl: './list-struc.component.html',
})
export class ListStrucComponent implements OnInit {

    @Input() productType = ProductTypes.结构;

    @Input() monomerId: number

    _areaId:number
    @Input()
    set areaId(val: number) {
        this._areaId = val;
        this.getData()
        this.getSumData()
    }

    get areaId() {
        return this._areaId;
    }
    
    isSpinning: boolean = false

    dto = new WarehousingFixStaticReqDto()
    data = new PagingData < any > ()

    sumData: any = {}

    constructor(
        private warehousingFixStaticService: WarehousingFixStaticService,
    ) {}

    ngOnInit() {}

    async getSumData() {
        console.log('this.monomerId',this.monomerId)
        this.sumData = await this.warehousingFixStaticService.fetchSumData(this.monomerId, 1)
    }

    async getData() {
        this.isSpinning = true
        this.dto.type = this.productType;
        this.dto.monomerId = this.areaId;
        try {
            this.data = await this.warehousingFixStaticService.getBoardData(this.dto);
        } catch (e) {
            console.log(e.error.message)
        } finally {
            this.isSpinning = false
        }
    }

}
