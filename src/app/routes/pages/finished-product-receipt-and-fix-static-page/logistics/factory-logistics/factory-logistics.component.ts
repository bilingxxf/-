import { Component, OnInit, Input } from '@angular/core';
import { FactoryLogisticsDTO } from '@core/logistics/factory-logistics-dto'
import { LogisticsService } from '@core/logistics/logistics.service'
import { CargoListService } from '@core/cargo-list/cargo-list.service'
import { NzModalService } from 'ng-zorro-antd'
import { CargoListDetailModalComponent } from '../../../cargo-list-mgmt-page/cargo-list-detail-modal/cargo-list-detail-modal.component'
import * as moment from 'moment'

@Component({
  selector: 'app-factory-logistics',
  templateUrl: './factory-logistics.component.html',
})
export class FactoryLogisticsComponent implements OnInit {

  @Input() projectId: number

  month:any

  listQuery = new FactoryLogisticsDTO()

  data:any = []

  constructor(
    private logisticsService: LogisticsService,
    private cargoListService: CargoListService,
    private modal: NzModalService,
  ) { }

  ngOnInit() {
    this.listQuery.projectId = this.projectId
    this.month = new Date()
    this.listQuery.startDate = moment(this.month).startOf('month').format('YYYY-MM-DD')
    this.listQuery.endDate = moment(this.month).endOf('month').format('YYYY-MM-DD')
    this.searchData(true)
  }

  getFactoryList() {

  }

  onDateChange() {
    this.listQuery.startDate = moment(this.month).startOf('month').format('YYYY-MM-DD')
    this.listQuery.endDate = moment(this.month).endOf('month').format('YYYY-MM-DD')
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
    this.data = await this.logisticsService.fetchFactoryLogistics(this.listQuery)
    this.listQuery.loading = false
  }

  openDetail(id) {
    this.modal.create({
      nzTitle: `清单详情`,
      nzWidth: 1200,
      nzContent: CargoListDetailModalComponent,
      nzComponentParams: { id },
      nzMaskClosable: false,
      nzOnOk: async () => {
          // this.getData()
      },
      nzFooter: null
    })
  }

  exportReport(id) {
    window.open(`/api/cargoLists/${id}/actions/export`);
  }

}
