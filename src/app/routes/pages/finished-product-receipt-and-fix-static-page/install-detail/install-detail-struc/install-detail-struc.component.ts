import { Component, OnInit, Input } from '@angular/core';
import { BaseDTO } from '@core/base/base-dto'
import { WarehousingFixStaticService } from '@core/warehousing-fix-static/warehousing-fix-static.service'
import { DetailComponent } from './detail/detail.component'
import { NzModalService } from 'ng-zorro-antd'
import { UtilService } from '@core/util/util.service'
import * as moment from 'moment'

@Component({
  selector: 'app-install-detail-struc',
  templateUrl: './install-detail-struc.component.html',
})
export class InstallDetailStrucComponent implements OnInit {

  _currentMonomer: any
  @Input()
  set currentMonomer(val) {           
    this._currentMonomer = val;
    this.listQuery.monomerId = val
    this.searchData(true)
  }
  
  get currentMonomer() {              
    return this._currentMonomer
  }

  month:any = new Date()

  listQuery = new BaseDTO()

  totalCount:number = 0

  data:any = []

  isSpinning:boolean = false

  constructor(
    private warehousingFixStaticService: WarehousingFixStaticService,
    private utilService: UtilService,
    private modal: NzModalService
  ) { }

  ngOnInit() {

  }

  getFactoryList() {
    this.searchData()
  }

  onDateChange() {
    // this.listQuery.date = moment(this.month).format('YYYY-MM')
    this.searchData(true)
  }

  async searchData(reset: boolean = false) {
    this.listQuery.loading = true;
    this.listQuery.startDate = moment(this.month).startOf('month').format('YYYY-MM-DD')
    this.listQuery.endDate = moment(this.month).endOf('month').format('YYYY-MM-DD')
    this.data = await this.warehousingFixStaticService.fetchListByMonthForStruc(this.listQuery);
    this.listQuery.loading = false;
  }

  openDetail(item) {

  }

  openDetailModal(date:string) {
    this.modal.create({
        nzTitle: `清单详情`,
        nzWidth: 1200,
        nzContent: DetailComponent,
        nzComponentParams: { 
          date,
          monomerId: this.currentMonomer
        },
        nzMaskClosable: false,
        // nzOnOk: async () => {
        //   this.getData()
        // },
        nzFooter: null
    })
  }

  exportReport(date:string) {
    window.open(`/api/sites/records/structure/download?${this.utilService.objToSearch({queryDate:date, monomerId: this.currentMonomer})}`);
  }

}
