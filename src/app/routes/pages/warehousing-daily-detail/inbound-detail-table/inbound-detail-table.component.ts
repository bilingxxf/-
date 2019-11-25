import { Component, OnInit, Input } from '@angular/core';
import { WarehousingService } from '../../../../core/warehousing/warehousing.service'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingInboundItem } from '../../../../core/warehousing/warehousing-inbound-item'
import { WarehousingQueryDto } from '../../../../core/warehousing/warehousing-query-dto'


@Component({
  selector: 'app-inbound-detail-table',
  templateUrl: './inbound-detail-table.component.html',
})
export class InboundDetailTableComponent implements OnInit {
 
    _monomerId: number
    @Input() date: string

    @Input() productType = ProductTypes.结构;
    @Input()
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData()
    }

    get monomerId() {
        return this._monomerId;
    }




    dto = new WarehousingQueryDto()

    data = new PagingData<WarehousingInboundItem>()


    constructor(
        private warehousingService: WarehousingService
    ) { }

    ngOnInit() {
    }

    

    async getData() {
        this.dto.monomerId = this.monomerId;
        this.dto.productType = this.productType;
        this.dto.queryDate = this.date;
        this.dto.warehouseType = 0;
        this.data = await this.warehousingService.getInboundDetailByDate(this.dto);
        console.log(this.data.data);
    }
}
