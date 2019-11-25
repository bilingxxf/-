import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'
import { PagingData } from '@core/common-entity/paging-data'
import { CargoList } from '@core/cargo-list/cargo-list'
import { CargoListQueryDto } from '@core/cargo-list/cargo-list-query-dto'
import { CargoListService } from '@core/cargo-list/cargo-list.service'
import { NzModalService } from 'ng-zorro-antd'
import { CarInListDetailModalComponent } from '../../../cargo-list-mgmt-page/carIn-list-detail-modal/cargo-list-detail-modal.component'
import { CarInListDetailByUserModalComponent } from '../../../cargo-list-mgmt-page/carIn-list-detail-by-user-modal/carIn-list-detail-by-user-modal.component'
import * as moment from 'moment'
import { UtilService } from '@core/util/util.service'

@Component({
  selector: 'app-inbound-mat-detail',
  templateUrl: './inbound-mat-detail.component.html',
})
export class InboundMatDetailComponent implements OnInit {

    date: any = new Date()

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {
        this._currentMonomer = val;
        if (val) {
            this.date = new Date()
            this.dto.projectId = this.currentMonomer.projectId;
            this.dto.monomerId = this.currentMonomer.id
            this.getData(true)
        }
    }
    get currentMonomer() {
        return this._currentMonomer
    }

    data: any = []

    plans: any = {}

    totalCount = 0

    dto = new CargoListQueryDto()

    isSpinning:boolean = false
    
    constructor(
        private cargoListService: CargoListService,
        private modal: NzModalService,
        private utilService: UtilService
    ) {}

    onChange(): void {
        this.getData(true)
    }

    async ngOnInit() {

    }

    async getData(reset:boolean = false) {
        if(reset){
            this.dto.page = 1
        }
        this.isSpinning = true
        try {
            this.dto.endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
            this.dto.startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
            this.plans = await this.cargoListService.fetchMatInList(this.dto)
            this.data = this.plans.data
            this.totalCount = this.plans.totalCount
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    exportExcel(monomerId: number, queryDate: number) {
        let productType = 3
        let warehouseType = 0
        console.log(monomerId, productType)
        window.open(`/api/warehouse-records/daily-stat/actions/export?${this.utilService.objToSearch({monomerId,warehouseType, queryDate, productType})}`);
    }

    monthExportExcel() {
        let warehouseType = 0
        let productType =3
        let monomerId = this.currentMonomer.id
        let startDate = this.dto.startDate
        let endDate = this.dto.endDate
        window.open(`/api/warehouse-records/daily-stat/actions/export?${this.utilService.objToSearch({monomerId,warehouseType, startDate,endDate, productType})}`);
    }

}
