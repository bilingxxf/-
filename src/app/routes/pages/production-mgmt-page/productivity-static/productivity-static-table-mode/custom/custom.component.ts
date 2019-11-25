import { Component, OnInit, Input } from '@angular/core'
import { ProjectService } from '@core/project/project.service'
import { ProjectStatus } from '../../../../../../constant/project-status.enum'
import { ProjectQueryDto } from '@core/project/project-query-dto'
// import { PagingData } from '../../../../../../core/common-entity/paging-data'
import { ProjectListItem } from '../../../../../../core/project/project-list-item'
import { SystemUserService } from '../../../../../../core/system-user/system-user.service'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
import { SystemUser } from '@core/system-user/system-user'
import { UploadChangeParam, UploadFile, NzMessageService } from 'ng-zorro-antd'
import * as moment from 'moment'
// import { User } from '@core/user/user'
// import { LocalstorageUserKey } from '../../../../../../constant/variable.constant'
import { UtilService } from '@core/util/util.service'
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router'

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
})
export class Custom implements OnInit {
    @Input() tableStyle: number

    @Input() projectId: number

    @Input() recordType: number

    // @Input() date: string
    // data = new PagingData<ProjectListItem>()
    date: any
    data: any[] = []
    dto = new ProjectQueryDto()

    projectStatus = ProjectStatus

    isVisible = false

    userList: SystemUser[] = [];

    detailExport: any[] = []

    project: ProjectListItem = {} as ProjectListItem;

    isSpinning:boolean = false

    isDetailSpinning:boolean = false
    constructor(
        private projectService: ProjectService,
        private systemUserService: SystemUserService,
        private msg: NzMessageService,
        private utilService: UtilService,
        private router: Router
    ) { }

    async ngOnInit() {
        // const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        // if (user && user.companyId) {
        //     this.companyId = user.companyId 
        // }
        this.getData()
        this.date = new Date()
    }

    async getData() {
        this.isSpinning = true
        try {
            this.dto.Authorization = localStorage.getItem('building-token');
            let date = new Date()
            let yearAndMonthDate  = this.recordType == 3 ? moment(date).format('YYYY') : moment(date).format('YYYY-MM')
            this.data = await this.projectService.reportProjectTable(this.projectId, yearAndMonthDate, this.recordType)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    async onChange(result: Date) {
        this.isSpinning = true
        try {
            this.date = result
            let valDate = this.recordType == 3 ? moment(result).format('YYYY') : moment(result).format('YYYY-MM')
            this.data = await this.projectService.reportProjectTable(this.projectId, valDate, this.recordType) 
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    exportExcel(timeDate: string, userId:any, isFinished:any) {
        let startDate = ''
        let endDate = ''
        if(this.recordType == 1){
            startDate = moment(timeDate).format('YYYY-MM-DD')
            endDate =  moment(timeDate).format('YYYY-MM-DD')
        }
        if(this.recordType == 2) {
            let newDate = timeDate.split('~')
            startDate = moment(newDate[0]).format('YYYY-MM-DD')
            endDate =  moment(newDate[1]).format('YYYY-MM-DD')
        }
        if(this.recordType == 3){
            startDate =  moment(timeDate).startOf("month").format('YYYY-MM-DD')
            endDate =  moment(timeDate).endOf("month").format('YYYY-MM-DD')
        }
        if(this.recordType == 4){
            let _date = timeDate ? timeDate : this.date
            startDate =  moment(_date).startOf("month").format('YYYY-MM-DD')
            endDate =  moment(_date).endOf("month").format('YYYY-MM-DD')
        }
        let projectId = this.projectId
        let type = this.recordType
        window.open(`/api/manufactures/records/record/project/export?${this.utilService.objToSearch({startDate, endDate, userId, isFinished, projectId, type})}`);
    }

    goDetail(event: Event, timeDate: string, userId:any, isFinished:any) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.isVisible = true
        this.isDetailSpinning = true
        let startDate = ''
        let endDate = ''
        //   let _userId = userId
        //   let _isFinished = isFinished
        console.log('timeDate',timeDate)
        if(this.recordType == 1){
            startDate = moment(timeDate).format('YYYY-MM-DD')
            endDate =  moment(timeDate).format('YYYY-MM-DD')
        }
        if(this.recordType == 2) {
            let newDate = timeDate.split('~')
            startDate = moment(newDate[0]).format('YYYY-MM-DD')
            endDate =  moment(newDate[1]).format('YYYY-MM-DD')
        }
        if(this.recordType == 3){
            startDate =  moment(timeDate).startOf("month").format('YYYY-MM-DD')
            endDate =  moment(timeDate).endOf("month").format('YYYY-MM-DD')
        }
        if(this.recordType == 4){
            let _date = timeDate ? timeDate : this.date
            startDate =  moment(_date).startOf("month").format('YYYY-MM-DD')
            endDate =  moment(_date).endOf("month").format('YYYY-MM-DD')
        }
        this.projectService.reportProjectDetail(this.projectId,startDate,endDate, userId, isFinished).then((res) => {
            this.detailExport = res
            this.isDetailSpinning = false
        }).catch(() => {
            this.isDetailSpinning = false
        })
        
    }

    getMonthEndDay(date) {
        // console.log('timeDate--------------------',moment(date).endOf("month").format('YYYY-MM-DD'))
        // new Date().getTime()
    }

    handleCancel() {
        this.isVisible = false;
    }

    async handleOk() {
        this.isVisible = false;
    }
    async getMembers(event: Event, row:ProjectListItem) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        this.project = row;
        const dto = new ListQueryWithCompanyId();
        dto.size = 1000;
        const response = await this.systemUserService.list(dto);
        this.userList = response.data;
        this.getProjectMembers(row.id);
        this.isVisible = true
    }

    async getProjectMembers(projectId: number) {
        const dto = new ListQueryWithCompanyId();
        dto.size = 1000;
        dto.projectId = projectId;
        const response = await this.systemUserService.list(dto);
        this.userList.forEach(user => {
            if (response.data.findIndex(val => {
                return val.id === user.id
            }) > -1) {
                (user as any).checked = true;
            } else {
                (user as any).checked = false;
            }
        })

    }

    async join(user) {
        if ((user as any).checked) {
            await this.projectService.join(this.project.id, user.id);
        } else {
            await this.projectService.remove(this.project.id, user.id);
        }
        this.msg.info('操作成功');
    }

    resetPageAndGetData() {
        setTimeout(() => {
            // this.data.pageNo = 1
            this.getData()
        }, 0)
    }

    reset() {
        this.dto.page = 1
        this.dto.size = 10
        this.resetPageAndGetData()
    }
}
