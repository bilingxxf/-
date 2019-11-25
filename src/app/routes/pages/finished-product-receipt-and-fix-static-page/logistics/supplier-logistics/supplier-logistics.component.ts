import { Component, OnInit, Input } from '@angular/core';
import { BaseQueryDTO } from '@core/base/base-query-dto'
import * as moment from 'moment'

@Component({
  selector: 'app-supplier-logistics',
  templateUrl: './supplier-logistics.component.html',
})
export class SupplierLogisticsComponent implements OnInit {

  _currentMonomer: any
  @Input()
  set currentMonomer(val) {           
    this._currentMonomer = val;
    this.searchData(true)
  }
  
  get currentMonomer() {              
    return this._currentMonomer
  }

  month:any = new Date()

  listQuery = new BaseQueryDTO()

  totalCount:number = 0

  data:any = [1]

  constructor(

  ) { }

  ngOnInit() {

  }

  getFactoryList() {

  }

  onDateChange() {
    this.listQuery.date = moment(this.month).format('YYYY-MM')
    this.searchData(true)
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.listQuery.page = 1;
    }
    // this.listQuery.loading = true;
    // this.randomUserService.getUsers(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList).subscribe((data: any) => {
    //   this.loading = false;
    //   this.total = 200;
    //   this.dataSet = data.results;
    // });
  }

  openDetail(item) {

  }

  exportReport(item) {

  }

}
