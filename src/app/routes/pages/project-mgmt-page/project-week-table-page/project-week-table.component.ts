import { Component, OnInit, Input } from '@angular/core'
import { ProjectService } from '@core/project/project.service'
import { ProjectStatus } from '../../../../constant/project-status.enum'
import { ProjectQueryDto } from '@core/project/project-query-dto'
import { PagingData } from '../../../../core/common-entity/paging-data'
import { ProjectListItem } from '../../../../core/project/project-list-item'
import { SystemUser } from '@core/system-user/system-user'
import {  NzMessageService } from 'ng-zorro-antd'
import * as moment from 'moment'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'
import { User } from '@core/user/user'
import { UtilService } from '@core/util/util.service'

@Component({
  selector: 'app-project-week-table',
  templateUrl: './project-week-table.component.html',
})
export class ProjectWeekTablePageComponent implements OnInit {
    @Input() tableStyle: number
    // @Input() date: string
    // data = new PagingData<ProjectListItem>()
    data: any[] = []
    date: any
    dto = new ProjectQueryDto()
    companyId: any
    projectStatus = ProjectStatus
    isVisible = false
    userList: SystemUser[] = [];
    project: ProjectListItem = {} as ProjectListItem;
    detailExport: any[] = []
    isSpinning:boolean = false
    constructor(
        private projectService: ProjectService,
        private msg: NzMessageService,
        private utilService: UtilService
    ) { }

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
            let yearAndMonthDate  = moment(new Date()).format('YYYY-MM')
            this.data = await this.projectService.reportTable(this.companyId, yearAndMonthDate, 2)
            this.data = this.data.map((v) => {
                let staticDate = v.statisticalDate.split('~')
                let newStaticDate = staticDate[0].split('/')
                if(newStaticDate[2] == '01') {
                    v.staticWeek = '第一周'
                }else if(newStaticDate[2] == '08') {
                    v.staticWeek = '第二周'
                }else if(newStaticDate[2] == '15') {
                    v.staticWeek = '第三周'
                }else {
                    v.staticWeek = '第四周'
                }
                return v
            })
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
        this.projectService.reportTable(this.companyId, valDate, 2).then((res) => {
            this.data = res
            this.data = this.data.map((v) => {
                let staticDate = v.statisticalDate.split('~')
                let newStaticDate = staticDate[0].split('/')
                if(newStaticDate[2] == '01') {
                    v.staticWeek = '第一周'
                }else if(newStaticDate[2] == '08') {
                    v.staticWeek = '第二周'
                }else if(newStaticDate[2] == '15') {
                    v.staticWeek = '第三周'
                }else {
                    v.staticWeek = '第四周'
                }
                 return v
            })
            this.isSpinning = false
        }).catch(() => {
            this.isSpinning = false
        })
    }

    goDetail(event: Event, timeDate: string) {
        let newDate = timeDate.split('~')
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.isVisible = true
        const startDate = moment(newDate[0]).format('YYYY-MM-DD')
        const endDate =  moment(newDate[1]).format('YYYY-MM-DD')
        this.projectService.reportDetail(this.companyId,startDate,endDate).then((res) => {
            this.detailExport = res
        })
    }

    async handleOk() {
        this.isVisible = false;
    }

    handleCancel() {
        this.isVisible = false;
    }

    exportExcel(timeDate: string) {
        let newDate = timeDate.split('~')
        const startDate = moment(newDate[0]).format('YYYY-MM-DD')
        const endDate =  moment(newDate[1]).format('YYYY-MM-DD')
        let companyId = this.companyId
        let type = 2
        window.open(`/api/manufactures/records/record/company/export?${this.utilService.objToSearch({startDate,endDate, companyId, type})}`);
    }
}
