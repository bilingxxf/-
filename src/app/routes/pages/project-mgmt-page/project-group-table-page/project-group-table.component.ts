import { Component, OnInit, Input, ɵConsole } from '@angular/core'
import { ProjectService } from '@core/project/project.service'
import { ProjectStatus } from '../../../../constant/project-status.enum'
import { ProjectQueryDto } from '@core/project/project-query-dto'
import { PagingData } from '../../../../core/common-entity/paging-data'
import { ProjectListItem } from '../../../../core/project/project-list-item'
import { SystemUser } from '@core/system-user/system-user'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'
import {   NzMessageService } from 'ng-zorro-antd'
import * as moment from 'moment'
import { User } from '@core/user/user'
import { UtilService } from '@core/util/util.service'

@Component({
  selector: 'app-project-group-table',
  templateUrl: './project-group-table.component.html',
})
export class ProjectGroupTablePageComponent implements OnInit {
    @Input() tableStyle: number
    // @Input() date: string
    // data = new PagingData<ProjectListItem>()
    data: any[] = []
    date: any
    dto = new ProjectQueryDto()

    projectStatus = ProjectStatus
    isVisible = false
    userList: SystemUser[] = [];
    detailExport: any[] = []
    project: ProjectListItem = {} as ProjectListItem;
    companyId: any
    isSpinning:boolean = false

    constructor(
        private projectService: ProjectService,
        private msg: NzMessageService,
        private utilService: UtilService
    ) { }

    handleCancel() {
        this.isVisible = false;
    }

    async handleOk() {
        this.isVisible = false;
    }

    async ngOnInit() {
        this.date = new Date()
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) {
            this.companyId = user.companyId 
        }
        this.getData()
    }

    async getData() {
        if(!this.companyId){
            return
        }
        this.isSpinning = true
        try {
            this.dto.Authorization = localStorage.getItem('building-token');
            let date = new Date()
            let yearAndMonthDate  = moment(date).format('YYYY-MM')
            this.data = await this.projectService.reportTable(this.companyId, yearAndMonthDate, 4)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    onChange(result: Date): void {
        if(!this.companyId){
            return
        }
        this.isSpinning = true
        let valDate = moment(result).format('YYYY-MM')
        this.projectService.reportTable(this.companyId, valDate, 4).then((res) => {
            this.data = res
            this.isSpinning = false
        }).catch(() => {
            this.isSpinning = false
        })
    }

    exportExcel(userId: string, isFinished: string) {
        let startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        let endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        let companyId = this.companyId
        let type = 4
        if(!isFinished) isFinished = 'false'
        window.open(`/api/manufactures/records/record/company/export?${this.utilService.objToSearch({userId,isFinished,companyId, startDate,endDate, type})}`);
    }

    goDetail(event: Event, userId: string, isFinished: string) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.isVisible = true
        let startDate = moment(this.date).startOf('month').format('YYYY-MM-DD')
        let endDate = moment(this.date).endOf('month').format('YYYY-MM-DD')
        if(!isFinished) isFinished = 'false'
        this.projectService.reportGroupDetail(userId,isFinished, this.companyId,startDate,endDate ).then((res) => {
            this.detailExport = res
        })
    }
}
