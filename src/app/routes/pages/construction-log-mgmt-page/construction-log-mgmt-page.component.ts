import * as _ from 'lodash'
import { Component, OnInit, Input } from '@angular/core'
// import { PagingData } from '@core/common-entity/paging-data'
// import { ConstructionLog } from '../../../core/construction-log/construction-log'
import { ConstructionLogQueryDto } from '../../../core/construction-log/construction-log-query-dto'
// import { ActivatedRoute } from '@angular/router'
import { ConstructionLogService } from '../../../core/construction-log/construction-log.service'
import { NzModalService } from 'ng-zorro-antd'
import { ConstructionLogCreateModalComponent } from './construction-log-create-modal/construction-log-create-modal.component'
import { Weather } from '../../../constant/weather.enum'
import { DayPart } from '../../../constant/day-part.enum'
import * as moment from 'moment'
import { UtilService } from '../../../core/util/util.service'
import { ConstructionLogDetailModalComponent } from './construction-log-detail-modal/construction-log-detail-modal.component'
import { ConstructionLogExportModalComponent } from './construction-log-export-modal/construction-log-export-modal.component'

@Component({
  selector: 'app-construction-log-mgmt-page',
  templateUrl: './construction-log-mgmt-page.component.html',
  styleUrls: ['./construction-log-mgmt-page.component.less']
})
export class ConstructionLogMgmtPageComponent implements OnInit {

    @Input() projectId: number

    weather = Weather

    dayPart = DayPart

    years = this.utilService.getRecentYears()

    months = this.utilService.getMonthOfYear()

    month = moment().get('month') + 1

    year = moment().get('year')

    data: DataPerDay[] = []

    dataFormatWeek: any[]

    weeks = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
    ]

    chunk = _.chunk

    constructor(
        private constructionLogService: ConstructionLogService,
        private modal: NzModalService,
        private utilService: UtilService
    ) { }

    ngOnInit() {
        this.setCurrentMonthData()
        console.log('chunk', _.chunk)
    }

    exportAll() {
        const firstDayOfMonth = moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
        const lastDayOfMonth = firstDayOfMonth.clone().endOf('month')
        // console.log(firstDayOfMonth.format('YYYY-MM-DD'));
        let query = {
            startDate: firstDayOfMonth.format('YYYY-MM-DD'),
            endDate: lastDayOfMonth.format('YYYY-MM-DD'),
            projectId: this.projectId
        }
        location.href = `/api/constructions/logs/actions/export?${this.utilService.objToSearch(query)}`
    }

    async setCurrentMonthData() {
        const firstDayOfMonth = moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
        const lastDayOfMonth = firstDayOfMonth.clone().endOf('month')
        this.data = []
        const dto = new ConstructionLogQueryDto()
        dto.projectId = this.projectId
        dto.queryDate = `${firstDayOfMonth.format('YYYY-MM')}`
        const monthData = await this.constructionLogService.list(dto)
        const firstItem = firstDayOfMonth.clone().startOf('isoWeek')
        const lastItem = lastDayOfMonth.clone().endOf('isoWeek')
        let current = firstItem
        while (current.isBefore(lastItem)) {
            const dataPerDay = new DataPerDay()
            dataPerDay.date = current.toDate()
            if (current.isBefore(firstDayOfMonth) || current.isAfter(lastDayOfMonth)) {
                dataPerDay.disabled = true
            } else {
                const record = monthData.find(data => data.recordDate === current.format('YYYY-MM-DD'))
                if (record) {
                    dataPerDay.hadWrote = true
                    dataPerDay.id = record.id
                }
            }
            this.data.push(dataPerDay)
            current = current.add(1, 'day')
        }
        this.dataFormatWeek = _.chunk(this.data,7)
    }

    openCreateModal(date: Date) {
        this.modal.create({
            nzTitle: `填写日志`,
            nzWidth: 600,
            nzComponentParams: {
                projectId: this.projectId,
                date
            },
            nzContent: ConstructionLogCreateModalComponent,
            nzMaskClosable: false,
            nzOnOk: async () => {
                this.setCurrentMonthData()
            },
            nzFooter: null
        })
    }

    dataPerDayClick(item: DataPerDay) {
        console.log('打开日纸',item.disabled, !item.hadWrote)
        if (item.disabled) return
        if (!item.hadWrote) return this.openCreateModal(item.date)
        this.openDetailModal(item.id, item.date)
    }

    openDetailModal(id: number, date: Date) {
        this.modal.create({
            nzTitle: `日志详情`,
            nzWidth: 600,
            nzComponentParams: { 
                id,
                date
             },
            nzContent: ConstructionLogDetailModalComponent,
            nzFooter: null
        })
    }

    export() {
        this.modal.create({
            nzTitle: `导出`,
            nzWidth: 600,
            nzComponentParams: {
                projectId: this.projectId
            },
            nzContent: ConstructionLogExportModalComponent,
            nzFooter: null
        })
    }
}

class DataPerDay {
    id?: number
    hadWrote = false
    date: Date
    disabled = false
}
