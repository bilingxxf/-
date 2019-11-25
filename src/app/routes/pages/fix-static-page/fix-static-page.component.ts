import { Component, OnInit, Input } from '@angular/core'
import { ProductTypes } from '../../../constant/product-types.enum'
import { ScanTypes } from '../../../constant/scan-types.enum';
import { WarehousingFixStaticService } from '../../../core/warehousing-fix-static/warehousing-fix-static.service'
import { WarehousingFixStaticReqDto } from '../../../core/warehousing-fix-static/warehousing-fix-static-req-dto';
import { UtilService } from '@core/util/util.service'
import * as moment from 'moment';
import { Router } from '@angular/router';




@Component({
    selector: 'app-fix-static-page',
    templateUrl: './fix-static-page.component.html',
  })
  export class FixStaticPageComponent {
    _date = '';
    _monomerId: number
    @Input()
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData();
    }

    get monomerId() {
        return this._monomerId
    }

    @Input() title: string

    @Input() productType: number = ProductTypes.结构

    @Input() scanType: string = ScanTypes.收货;

    @Input() projectId: number


    @Input()
    set date(val: any) {
        this._date = val;
        this.getData();
    }

    get date() {
        return this._date;
    }

    data: any[] = []

    dto = new WarehousingFixStaticReqDto() 



    constructor(
      private warehousingFixStaticService: WarehousingFixStaticService,
      private router: Router,
      private utilService: UtilService,
    ) { }

    async getData() { 
      if (this.projectId) {
        this.dto.projectId = this.projectId;
        this.dto.monomerId = this.monomerId;
        this.dto.scanType = this.scanType;
        this.dto.productType = this.productType;
        let date = new Date(this.date),
              month = date.getMonth();
        date.setMonth(month);
        date.setDate(1);
        this.dto.startDate = moment(new Date(date)).format('YYYY-MM-DD');
        
        date.setMonth(month + 1);
        date.setDate(0);

        const days = date.getDate();
        this.dto.endDate = moment(new Date(date)).format('YYYY-MM-DD');

        this.data = await this.warehousingFixStaticService.getMonthData(this.dto);
    }
  }

  export() {
    if (this.projectId) {
      this.dto.projectId = this.projectId;
        this.dto.monomerId = this.monomerId;
        this.dto.scanType = this.scanType;
        this.dto.productType = this.productType;
        let date = new Date(this.date),
              month = date.getMonth();
        date.setMonth(month);
        date.setDate(1);
        this.dto.startDate = moment(new Date(date)).format('YYYY-MM-DD');
        
        date.setMonth(month + 1);
        date.setDate(0);

        const days = date.getDate();
        this.dto.endDate = moment(new Date(date)).format('YYYY-MM-DD');

        location.href = `/api/sites/records/receipts/action/export?${this.utilService.objToSearch(this.dto)}`
    }
  }

  go(date) {
    this.router.navigate(['finished-daily-detail', this.projectId, this.projectId], {
        queryParams: {
            scanType: this.scanType,
            productType: this.productType,
            date,
            monomerId: this.monomerId
        }
    })
    }
}
