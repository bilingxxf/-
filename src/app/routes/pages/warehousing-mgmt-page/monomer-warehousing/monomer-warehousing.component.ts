import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router';
import { WarehousingService } from '../../../../core/warehousing/warehousing.service'
import { WarehousingQueryDto } from '../../../../core/warehousing/warehousing-query-dto'
import { ProductTypes } from '../../../../constant/product-types.enum'
import * as moment from 'moment';
import { UtilService } from '@core/util/util.service'



@Component({
  selector: 'app-monomer-warehousing',
  templateUrl: './monomer-warehousing.component.html',
})
export class MonomerWarehousingComponent implements OnInit {
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

    @Input() warehouseType: number = 0;

    @Input() projectId: number


    @Input()
    set date(val: any) {
        this._date = val;
        this.getData();
    }

    get date() {
        return this._date;
    }

    dto = new WarehousingQueryDto() 

    data: any[] = []


    constructor(
        private warehousingService: WarehousingService,
        private router: Router,
        private utilService: UtilService,
    ) { }

    async ngOnInit() {
    }

    go(date) {
        this.router.navigate(['/warehousing-deily-detail', this.projectId, this.projectId], {
            queryParams: {
                warehouseType: this.warehouseType,
                productType: this.productType,
                date,
                monomerId: this.monomerId
            }
        })
    }

    async getData() { 
        if (this.projectId) {
            this.dto.projectId = this.projectId;
            this.dto.monomerId = this.monomerId;
            this.dto.warehouseType = this.warehouseType;
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
    
            this.data = await this.warehousingService.listByDate(this.dto);
        }
    }

    export() {
      location.href = `/api/warehouse-records/daily-stat/actions/export?${this.utilService.objToSearch(this.dto)}`
    }


}
