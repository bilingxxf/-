import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'
import { CargoListService } from '@core/cargo-list/cargo-list.service'
import { FactoryLogisticsDTO } from '@core/logistics/factory-logistics-dto'
import { NzModalService } from 'ng-zorro-antd'
import { CargoListDetailModalComponent } from '../../cargo-list-mgmt-page/cargo-list-detail-modal/cargo-list-detail-modal.component'
import * as moment from 'moment'
import { UtilService } from '@core/util/util.service'

@Component({
  selector: 'app-history-outbound-list',
  templateUrl: './history-outbound-list.component.html',
})
export class HistoryOutboundListComponent implements OnInit {

    @Input() projectId: number
    @Input() monomerId: number
    _currentMonomer: any  
    @Input()
    set currentMonomer(val) {           
      this._currentMonomer = val;
      
    }
    get currentMonomer() {              
      return this._currentMonomer
    }

    date: any
    data: any = []
    plans: any = {}
    totalCount = 0
    listQuery = new FactoryLogisticsDTO()
    
    constructor(
        private cargoListService: CargoListService,
        private modal: NzModalService,
        private location: Location,
        private utilService: UtilService
    ) { } 
 
    // onChange(result: Date): void {
    //     this.dto.projectId=this.currentMonomer.projectId;
    //     this.dto.endDate = moment(result).endOf('month').format('YYYY-MM-DD')
    //     this.dto.startDate = moment(result).startOf('month').format('YYYY-MM-DD')
    //     this.getData()
    // }
    // async ngOnInit() {
    //     this.date = new Date()
    //     this.dto.projectId=this.currentMonomer.projectId;
    //     // console.log('项目菜单'+ this.currentMonomer.id)
    //     this.months=this.myDate.getMonth()+1<10 ? "0"+`${this.myDate.getMonth()+1}` : `${this.myDate.getMonth()+1}`;
    //     this.day=this.myDate.getDate()<10 ? "0"+this.myDate.getDate() : `${this.myDate.getDate()}`
    //     this.dto.startDate=`${this.myDate.getFullYear()}-${this.months}-01`;            //报错
    //     this.dto.endDate=`${this.myDate.getFullYear()}-${this.months}-${this.myDate.getDate()}`
    //     this.getData()        
    // }

    // async getData() {
    //     this.plans = await this.cargoListService.querylist(this.dto)
    //     this.data = this.plans.data.map(item => {
    //         item.difference = (item.actualWeight - item.theoreticalWeight).toFixed(2)
    //         item.differenceRate = Math.abs(Number((item.difference / item.theoreticalWeight * 100).toFixed(2)))
    //         return item
    //     })
    //     this.totalCount = this.plans.totalCount
    //     // console.log('出库详情信息+++++',this.data)
    //     // this.data = await this.cargoListService.list(this.dto)
    // }

    ngOnInit() {
        this.listQuery.projectId = this.projectId || this.currentMonomer.projectId
        this.date = new Date()
        this.listQuery.startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        this.listQuery.endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        this.searchData(true)
      }
    
      onDateChange() {
        this.listQuery.startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        this.listQuery.endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        this.searchData(true)
      }
    
      onTypeChange() {
        this.searchData(true)
      }
    
      async searchData(reset: boolean = false) {
        this.listQuery.loading = true
        if (reset) {
          this.listQuery.page = 1;
        }
        // this.data = await this.logisticsService.fetchFactoryLogistics(this.listQuery)
        this.plans = await this.cargoListService.querylist(this.listQuery)
        this.data = this.plans.data.map(item => {
            item.actualWeight = item.actualWeight || 0
            item.theoreticalWeight = item.theoreticalWeight || 0
            item.difference = Number((item.actualWeight - item.theoreticalWeight).toFixed(2))
            item.differenceRate = item.theoreticalWeight > 0 ? Math.abs(Number((item.difference / item.theoreticalWeight * 100).toFixed(2))) : 0.00 + '%'
            console.log(item.actualWeight, item.theoreticalWeight,item.difference,item.differenceRate)
            return item
        })
        this.listQuery.loading = false
      }

    openDetailModal(id: number) {
        this.modal.create({
            nzTitle: `清单详情`,
            nzWidth: 1000,
            nzContent: CargoListDetailModalComponent,
            nzComponentParams: { id },
            nzMaskClosable: false,
            nzOnOk: async () => {
                // this.getData()
            },
            nzFooter: null
        })
    }

    exportExcel(id: number) {
        console.log(id)
        window.open(`/api/cargoLists/${id}/actions/export`);
    }

    monthExportExcel() {
        let projectId = this.listQuery.projectId
        let startDate = this.listQuery.startDate
        let endDate = this.listQuery.endDate
        window.open(`/api/warehouse-records/month/outStockRecord/export?${this.utilService.objToSearch({projectId,startDate,endDate})}`);
    }

}

