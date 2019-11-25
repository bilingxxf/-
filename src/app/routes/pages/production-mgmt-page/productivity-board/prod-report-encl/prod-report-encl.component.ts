import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@core/util/util.service'
import { ProjectService } from '@core/project/project.service'
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment'

@Component({
  selector: 'app-prod-report-encl',
  templateUrl: './prod-report-encl.component.html',
})
export class ProdReportEnclComponent implements OnInit {

    @Input() projectId: number

    isVisible:boolean = false

    exportDetail: any = []

    date: any

    startDate: any

    endDate: any

    data: any = []

    isSpinning:boolean = false

    isDetailSpinning:boolean = false

    // dto = new ProjectQueryDto()

    constructor(
        private utilService: UtilService,
        private projectService: ProjectService,
    ) { }

    async ngOnInit() {
        this.date = new Date()
        this.startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        this.endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        this.getData()
    }

    async getData() {
        this.isSpinning = true
        try {
            this.data = await this.projectService.reportByEncl(this.projectId, this.startDate, this.endDate)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    onChange(result: Date): void {
        this.date = result
        this.startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        this.endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        this.getData()
    }

    exportExcel(userId) {
        let projectId = this.projectId
        window.open(`/api/manufactures/records/project/containment/export?${this.utilService.objToSearch({startDate: this.startDate, endDate: this.endDate, projectId, userId})}`);
    }

    /**
     *查看详情
    *
    * @param {*} userId 用户id
    * @memberof ProdReportEnclComponent
    */
    async openDetail(userId) {
        this.isVisible = true
        this.isDetailSpinning = true
        let startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        let endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        this.projectService.reportDetailByEncl(this.projectId,startDate,endDate, userId).then((res) => {
            this.exportDetail = res
            this.isDetailSpinning = false
        }).catch(() => {
            this.isDetailSpinning = false
        })
    }

    handleCancel() {
        this.isVisible = false;
    }

    async handleOk() {
        this.isVisible = false;
    }

}
