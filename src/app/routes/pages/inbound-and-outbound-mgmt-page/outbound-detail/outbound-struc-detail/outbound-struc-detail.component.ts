import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'
import { FactoryLogisticsDTO } from '@core/logistics/factory-logistics-dto'
import { CargoListService } from '@core/cargo-list/cargo-list.service'
import { NzModalService } from 'ng-zorro-antd'
import { CargoListDetailModalComponent } from '../../../cargo-list-mgmt-page/cargo-list-detail-modal/cargo-list-detail-modal.component'
import * as moment from 'moment'
import { UtilService } from '@core/util/util.service'

@Component({
    selector: 'app-outbound-struc-detail',
    templateUrl: './outbound-struc-detail.component.html',
})
export class OutboundStrucDetailComponent implements OnInit {

    @Input() projectId: number
    @Input() monomerId: number
    months: string
    _currentMonomer: any
    day: string;
    date: any
    @Input()
    set currentMonomer(val) {
        this._currentMonomer = val;

    }
    get currentMonomer() {
        return this._currentMonomer
    }

    data: any = []
    plans: any = {}
    totalCount = 0
    dto = new FactoryLogisticsDTO()

    myDate = new Date();
    constructor(
        private cargoListService: CargoListService,
        private modal: NzModalService,
        private location: Location,
        private utilService: UtilService
    ) {}

    onChange(result: Date): void {
        this.dto.projectId = this.currentMonomer.projectId;
        this.dto.endDate = moment(result).endOf('month').format('YYYY-MM-DD')
        this.dto.startDate = moment(result).startOf('month').format('YYYY-MM-DD')
        this.getData()
    }
    async ngOnInit() {
        this.date = new Date()
        this.dto.projectId = this.currentMonomer.projectId;
        this.months = this.myDate.getMonth() + 1 < 10 ? "0" + `${this.myDate.getMonth()+1}` : `${this.myDate.getMonth()+1}`;
        this.day = this.myDate.getDate() < 10 ? "0" + this.myDate.getDate() : `${this.myDate.getDate()}`
        this.dto.startDate = `${this.myDate.getFullYear()}-${this.months}-01`; //报错
        this.dto.endDate = `${this.myDate.getFullYear()}-${this.months}-${this.myDate.getDate()}`
        this.getData()
    }

    async getData() {
        this.plans = await this.cargoListService.querylist(this.dto)
        this.data = this.plans.data.map(item => {
            item.difference = (item.actualWeight - item.theoreticalWeight).toFixed(2)
            item.differenceRate = Math.abs(Number((item.difference / item.theoreticalWeight * 100).toFixed(2)))
            return item
        })
        this.totalCount = this.plans.totalCount
    }

    openDetailModal(id: number) {
        this.modal.create({
            nzTitle: `清单详情`,
            nzWidth: 1000,
            nzContent: CargoListDetailModalComponent,
            nzComponentParams: {
                id
            },
            nzMaskClosable: false,
            nzOnOk: async () => {
                this.getData()
            },
            nzFooter: null
        })
    }

    exportExcel(id: number) {
        console.log(id)
        window.open(`/api/cargoLists/${id}/actions/export`);
    }

    monthExportExcel() {
        let warehouseType = 1
        let productType = 1
        let monomerId = this.currentMonomer.id
        let startDate = this.dto.startDate
        let endDate = this.dto.endDate
        window.open(`/api/warehouse-records/daily-stat/actions/export?${this.utilService.objToSearch({monomerId,warehouseType, startDate,endDate, productType})}`);
    }

}
