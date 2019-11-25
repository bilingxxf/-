import { Component, OnInit,Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd'
import { SupplieQueryDTO } from '@core/supplie/supplie-query-dto'
import { UtilService } from '@core/util/util.service'
import { DetailMatComponent } from '../detail-mat/detail-mat.component';
import { SupplieService } from '@core/supplie/supplie.service'
import * as moment from 'moment'

@Component({
  selector: 'app-list-mat',
  templateUrl: './list-mat.component.html',
})
export class ListMatComponent implements OnInit {

  @Input() factoryAble: boolean = false

  _currentMonomer: any
  @Input()
  set currentMonomer(val) {           
    this._currentMonomer = val;
    this.listQuery.monomerId = val;
    this.listQuery.productType = 3
    this.searchData(true)
  }
  
  get currentMonomer() {              
    return this._currentMonomer
  }

  month:any = new Date()

  listQuery = new SupplieQueryDTO()

  totalCount:number = 0

  supplieData:any = {}

  constructor(
    private modal: NzModalService,
    private supplieService: SupplieService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.listQuery.productType = 3
  }

  getSupplieList() {

  }

  onDateChange() {
    // this.listQuery.date = moment(this.month).format('YYYY-MM')
    this.searchData(true)
  }

  async searchData(reset: boolean = false) {
    if (reset) {
      this.listQuery.page = 1;
    }
    this.listQuery.loading = true;
    if(this.factoryAble) {
      this.supplieData = await this.supplieService.fetchList(this.listQuery)
    }else{
      this.supplieData = await this.supplieService.fetchListBySite(this.listQuery)
    }
    this.listQuery.loading = false;
  }

  showDetail(item) {
      this.modal.create({
        nzTitle: `辅材详情`,
        nzWidth: 1400,
        nzContent: DetailMatComponent,
        nzComponentParams: { 
          productId: item.productId,
          supplierId: item.supplierId,
          manufactureType: item.manufactureType
        },
        nzMaskClosable: false,
        nzFooter: null
      })
    
  }

  exportExcelDetail(item) {
    window.open(`/api/supplier/export-supplier-detail?${this.utilService.objToSearch(
      {
        productId: item.productId,
        supplierId: item.supplierId,
        manufactureType: item.manufactureType
      })}`);
  }

}
