import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { FixPlanTypes } from '../../../../constant/fix-plan-types.enum'
import { FixPlanQueryDto } from '@core/fix-plan/fix-plan-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { FixPlanSummaryItem } from '../../../../core/fix-plan/fix-plan-summary-item'
import { FixPlanService } from '../../../../core/fix-plan/fix-plan.service'
import { FixPlanSummaryQueryDto } from '@core/fix-plan/fix-plan-summary-query-dto'
import * as moment from 'moment'

@Component({
  selector: 'app-fix-plan-summary-table',
  templateUrl: './fix-plan-summary-table.component.html',
})
export class FixPlanSummaryTableComponent implements OnInit {

    @Input() areaDivisionId: number

    @Input() productType = ProductTypes.结构

    date: Date = null

    weekDto = new FixPlanSummaryQueryDto()

    monthDto = new FixPlanSummaryQueryDto()

    weekData = new PagingData<FixPlanSummaryItem>()

    monthData = new PagingData<FixPlanSummaryItem>()

    constructor(
        private fixPlanService: FixPlanService
    ) { }

    ngOnInit() {
        this.weekDto.areaDivisionId = this.areaDivisionId
        this.weekDto.productType = this.productType
        this.weekDto.type = FixPlanTypes.周计划
        this.monthDto.areaDivisionId = this.areaDivisionId
        this.monthDto.productType = this.productType
        this.monthDto.type = FixPlanTypes.周计划
    }

    search(value: Date) {
        this.weekDto.queryDate = moment(value).format('YYYY-MM-DD')
        this.monthDto.queryDate = moment(value).format('YYYY-MM')
        this.weekDto.page = this.monthDto.page = 1
        this.getWeekData()
        this.getMonthData()
    }

    async getWeekData() {
        this.weekData = await this.fixPlanService.summaryList(this.weekDto)
    }

    async getMonthData() {
        this.monthData = await this.fixPlanService.summaryList(this.monthDto)
    }
}
