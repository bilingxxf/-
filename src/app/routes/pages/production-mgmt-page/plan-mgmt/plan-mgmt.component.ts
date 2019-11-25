import { Component, OnInit, Input } from '@angular/core'
import { MonomerService } from '@core/monomer/monomer.service'
import { PlanService } from '@core/plan/plan.service'
import { UtilService } from '@core/util/util.service'
import * as moment from 'moment'
import { ProductDemandPlanListItem } from '@core/product-demand/product-demand-plan-list-item'
import { PlanQueryByMonthQueryDto } from '../../../../core/plan/plan-query-by-month-query-dto'
import { NzModalService } from 'ng-zorro-antd'
import { PlanListModalComponent } from './plan-list-modal/plan-list-modal.component'
import { ProductTypes } from '../../../../constant/product-types.enum';
import * as _ from 'lodash'

@Component({
  selector: 'app-plan-mgmt',
  templateUrl: './plan-mgmt.component.html',
  styles: [
      `.item {
        margin: 0 4px;
        padding: 4px 8px;
        height: 116px;
        border-top: 2px solid #e9e9e9;
      }

      .item-disabled {
        color: rgba(0, 0, 0, .25);
      }

      .item-wrote {
        border-top-color: #00CC83;
        cursor: pointer;
      }

      .item-unwrote {
        cursor: pointer;

        :hover {
          background-color: #EEF7FD;
        }
      }`
  ]
})
export class PlanMgmtComponent implements OnInit {

    @Input() projectId: number

    years = this.utilService.getRecentYears()

    months = this.utilService.getMonthOfYear()

    month = moment().get('month') + 1

    year = moment().get('year')

    data: DataPerDay[] = []

    dataFormat7: any[]

    structureData = []

    containmentdata = []

    materialData = []
    active = 1;

    weeks = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
    ]

    constructor(
        private monomerService: MonomerService,
        private planService: PlanService,
        private utilService: UtilService,
        private modal: NzModalService
    ) { }

    async ngOnInit() {
        this.setCurrentMonthData()
    }

    async setCurrentMonthData() {
        this.getContainmentdata()
        this.getMaterialMonthData()
        this.getStructureData()
    }
    async getStructureData() {
        const firstDayOfMonth = moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
        const lastDayOfMonth = firstDayOfMonth.clone().endOf('month')
        this.data = []
        const dto = new PlanQueryByMonthQueryDto()
        dto.projectId = this.projectId 
        dto.yearMonth = `${firstDayOfMonth.format('YYYY-MM')}`
        const monthData = await this.planService.getPlanByMonth(dto)
        const firstItem = firstDayOfMonth.clone().startOf('isoWeek')
        const lastItem = lastDayOfMonth.clone().endOf('isoWeek')
        let current = firstItem
        while (current.isBefore(lastItem)) {
            const dataPerDay = new DataPerDay()
            dataPerDay.date = current.toDate()
            if (current.isBefore(firstDayOfMonth) || current.isAfter(lastDayOfMonth)) {
                // dataPerDay.disabled = true
            } else {
                // const record = monthData.find(data => data.recordDate === current.format('YYYY-MM-DD'))
                const record = Object.keys(monthData).find(date => current.format('YYYY-MM-DD') === date)
                if (record) {
                    dataPerDay.data = monthData[record]
                }
            }
            this.data.push(dataPerDay)
            current = current.add(1, 'day')
        }
        this.dataFormat7 = _.chunk(this.data, 7)
    }

    async getMaterialMonthData() {
        const firstDayOfMonth = moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
        const lastDayOfMonth = firstDayOfMonth.clone().endOf('month')
        this.materialData = []
        const dto = new PlanQueryByMonthQueryDto()
        dto.projectId = this.projectId 
        dto.productType = ProductTypes.辅材
        dto.yearMonth = `${firstDayOfMonth.format('YYYY-MM')}`
        const monthData = await this.planService.getPlanByMonth(dto)
        const firstItem = firstDayOfMonth.clone().startOf('isoWeek')
        const lastItem = lastDayOfMonth.clone().endOf('isoWeek')
        let current = firstItem
        while (current.isBefore(lastItem)) {
            const dataPerDay = new DataPerDay()
            dataPerDay.date = current.toDate()
            if (current.isBefore(firstDayOfMonth) || current.isAfter(lastDayOfMonth)) {
                // dataPerDay.disabled = true
            } else {
                // const record = monthData.find(data => data.recordDate === current.format('YYYY-MM-DD'))
                const record = Object.keys(monthData).find(date => current.format('YYYY-MM-DD') === date)
                if (record) {
                    dataPerDay.data = monthData[record]
                }
            }
            this.materialData.push(dataPerDay)
            current = current.add(1, 'day')
        }
    }

    async getContainmentdata() {
        const firstDayOfMonth = moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
        const lastDayOfMonth = firstDayOfMonth.clone().endOf('month')
        this.containmentdata = []
        const dto = new PlanQueryByMonthQueryDto()
        dto.projectId = this.projectId 
        dto.productType = ProductTypes.围护;
        dto.yearMonth = `${firstDayOfMonth.format('YYYY-MM')}`
        const monthData = await this.planService.getPlanByMonth(dto)
        const firstItem = firstDayOfMonth.clone().startOf('isoWeek')
        const lastItem = lastDayOfMonth.clone().endOf('isoWeek')
        let current = firstItem
        while (current.isBefore(lastItem)) {
            const dataPerDay = new DataPerDay()
            dataPerDay.date = current.toDate()
            if (current.isBefore(firstDayOfMonth) || current.isAfter(lastDayOfMonth)) {
                // dataPerDay.disabled = true
            } else {
                // const record = monthData.find(data => data.recordDate === current.format('YYYY-MM-DD'))
                const record = Object.keys(monthData).find(date => current.format('YYYY-MM-DD') === date)
                if (record) {
                    dataPerDay.data = monthData[record]
                }
            }
            this.containmentdata.push(dataPerDay)
            current = current.add(1, 'day')
        }
    }

    chunk = _.chunk

    click(d: DataPerDay) {
        console.log(d);
        if (!d.data.length) return
        this.modal.create({
            nzTitle: `计划详情`,
            nzWidth: 600,
            nzComponentParams: { data: d.data },
            nzContent: PlanListModalComponent,
            nzFooter: null
        })
    }

}

class DataPerDay {
    data: ProductDemandPlanListItem[] = []
    date: Date
}
