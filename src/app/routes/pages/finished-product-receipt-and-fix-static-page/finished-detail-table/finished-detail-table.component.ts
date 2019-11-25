import { Component, OnInit, Input } from '@angular/core';
import { ProductTypes } from '../../../../constant/product-types.enum'
import { WarehousingFixStaticService } from '../../../../core/warehousing-fix-static/warehousing-fix-static.service'
import { WarehousingFixStaticReqDto } from '../../../../core/warehousing-fix-static/warehousing-fix-static-req-dto';
import { PagingData } from '@core/common-entity/paging-data'
import { UtilService } from '@core/util/util.service'




@Component({
  selector: 'app-finished-detail-table',
  templateUrl: './finished-detail-table.component.html',
})
export class FinishedDetailTableComponent implements OnInit {
    _monomerId: number
    @Input() date: string
    @Input() projectId: number;

    @Input() productType = ProductTypes.结构;
    @Input()
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData()
    }

    get monomerId() {
        return this._monomerId;
    }

    dto = new WarehousingFixStaticReqDto()
    data = new PagingData<any>()
    summary: any

    constructor(
      private warehousingFixStaticService: WarehousingFixStaticService,
      private utilService: UtilService,
    ) { }

    ngOnInit() {
    }

    export() {
      this.dto.monomerId = this.monomerId;
      this.dto.productType = this.productType;
      this.dto.queryDate = this.date;
      this.dto.scanType = '安装';
      this.dto.projectId = this.projectId;
      location.href = `/api/sites/records/receipts/action/export?${this.utilService.objToSearch(this.dto)}`
    }

    async getData() {
        this.dto.monomerId = this.monomerId;
        this.dto.productType = this.productType;
        this.dto.queryDate = this.date;
        this.dto.scanType = '安装';
        this.dto.projectId = this.projectId;
        this.data = await this.warehousingFixStaticService.getSetupDailyData(this.dto);
        this.summary = await this.warehousingFixStaticService.getSetUpstatisticsData(this.dto); 
    }
}
