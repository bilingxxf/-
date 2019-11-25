import { Component, OnInit, Input } from '@angular/core'
import { UtilService } from '../../../core/util/util.service'
import { Moment } from 'moment'
import * as moment from 'moment'
import * as _ from 'lodash'
import { NzModalService } from '../../../../../node_modules/ng-zorro-antd'
import { SecurityLogCModalComponent } from './security-log-c-modal/security-log-c-modal.component'
import { SecurityLogListReqDto } from '../../../core/security-log/security-log-list-req-dto'
import { SecurityLogService } from '../../../core/security-log/security-log.service'
import { SecurityLogListItem } from '../../../core/security-log/security-log-list-item'
import { SecurityLogSituations } from '../../../constant/security-log-situations.enum'
import { Colors } from '../../../constant/colors.enum'
import { SecurityLogDetailModalComponent } from './security-log-detail-modal/security-log-detail-modal.component'

@Component({
  selector: 'app-security-log-page',
  templateUrl: './security-log-page.component.html',
  styleUrls: ['./security-log-page.component.less'],
})
export class SecurityLogPageComponent implements OnInit {

    @Input() projectId: number

    years = this.utilService.getRecentYears()

    months = this.utilService.getMonthOfYear()

    month = moment().get('month') + 1

    year = moment().get('year')

    dto = new SecurityLogListReqDto()

    currentMonthData: PageItem[] = []

    constructor(
        private utilService: UtilService,
        private modal: NzModalService,
        private securityLogService: SecurityLogService
    ) { }

    ngOnInit() {
        this.dto.projectId = this.projectId
        this.setCurrentMonthData()
    }

    /**
     * 不想注释了
     * 爱看不看吧
     */
    async setCurrentMonthData() {
        const totalBoxCount = 33
        this.dto.queryDate = `${this.year}-${(this.month + '').length === 1 ? '0' + this.month : this.month}`
        const currentMonthDays = moment(this.dto.queryDate, 'YYYY-M').daysInMonth()
        const securityLogs = await this.securityLogService.getList(this.dto)
        this.currentMonthData = _.fill(Array(totalBoxCount), {}).map((o, i) => {
            i = i + 1
            const date = moment(`${this.year}-${this.month}-${i}`, 'YYYY-M-D')
            const item = new PageItem()
            if (i > currentMonthDays) {
                item.isNotBlank = false
            } else {
                item.isNotBlank = true
                item.day = i
                item.date = date
                item.securityLog = securityLogs.find(sl => sl.recordDate === date.format('YYYY-MM-DD'))
            }
            return item
        })
    }

    handleClick(item: PageItem) {
        if (!item.isNotBlank) return
        if (!item.securityLog && !item.date.isAfter(moment())) return this.openCreateModal(item.date)
        return this.openDetailModal(item.securityLog)
    }

    openCreateModal(date: Moment) {
        this.modal.create({
            nzTitle: `填写安全日志`,
            nzContent: SecurityLogCModalComponent,
            nzComponentParams: {
                date,
                projectId: this.projectId
            },
            nzWidth: 600,
            nzMaskClosable: false,
            nzOnOk: async () => {
                this.setCurrentMonthData()
            },
            nzFooter: null
        })
    }

    openDetailModal(log: SecurityLogListItem) {
        this.modal.create({
            nzTitle: `安全日志详情`,
            nzContent: SecurityLogDetailModalComponent,
            nzComponentParams: {
                id: log.id
            },
            nzWidth: 1000,
            nzFooter: null
        })
    }
}

class PageItem {
    isNotBlank: boolean // 是否为不是空白的

    day?: number // 几号

    date?: Moment

    securityLog?: SecurityLogListItem

    /** 背景颜色 */
    getColor(): string {
        if (!this.securityLog) return '#fff'
        switch (this.securityLog.situation) {
            case SecurityLogSituations.无工伤:
                return Colors.SUCCESS
            case SecurityLogSituations.可记录工伤:
                return Colors.WARN
            case SecurityLogSituations.损失工时工伤:
                return Colors.DANGER
            default:
                return '#fff'
        }
    }
}
