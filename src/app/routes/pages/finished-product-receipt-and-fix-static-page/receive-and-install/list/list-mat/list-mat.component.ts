import { Component, OnInit, Input } from '@angular/core'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductTypes } from '../../../../../../constant/product-types.enum'
import { WarehousingFixStaticReqDto } from '@core/warehousing-fix-static/warehousing-fix-static-req-dto'
import { WarehousingFixStaticService } from '@core/warehousing-fix-static/warehousing-fix-static.service'

@Component({
    selector: 'app-list-mat',
    templateUrl: './list-mat.component.html',
})
export class ListMatComponent implements OnInit {

    @Input() productType = ProductTypes.结构;

    _monomerId: number
    @Input()
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData()
    }

    get monomerId() {
        return this._monomerId;
    }

    isSpinning:boolean = false

    dto = new WarehousingFixStaticReqDto()
    data = new PagingData < any > ()

    sumData: any = {}

    constructor(
        private warehousingFixStaticService: WarehousingFixStaticService,
    ) {}

    ngOnInit() {}

    async getData() {
        this.isSpinning = true
        try {
            this.dto.type = this.productType;
            this.dto.monomerId = this.monomerId;
            this.data = await this.warehousingFixStaticService.getBoardData(this.dto);
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

}
