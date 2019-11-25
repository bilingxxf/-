import { Component, OnInit, Input } from '@angular/core'
import { ProjectService } from '@core/project/project.service'
import { ProjectStatus } from '../../../constant/project-status.enum'
import { ProjectQueryDto } from '@core/project/project-query-dto'
import { PagingData } from '../../../core/common-entity/paging-data'
import { ProjectListItem } from '../../../core/project/project-list-item'
import { SystemUserService } from '../../../core/system-user/system-user.service'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
import { SystemUser } from '@core/system-user/system-user'
import { UploadChangeParam, UploadFile, NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-project-mgmt-page',
  templateUrl: './project-mgmt-page.component.html',
})
export class ProjectMgmtPageComponent implements OnInit {
    data = new PagingData<ProjectListItem>()

    dto = new ProjectQueryDto()

    projectStatus = ProjectStatus
    isVisible = false
    userList: SystemUser[] = [];
    project: ProjectListItem = {} as ProjectListItem;

    constructor(
        private projectService: ProjectService,
        private systemUserService: SystemUserService,
        private msg: NzMessageService,

    ) { }

    handleCancel() {
        this.isVisible = false;
    }

    async handleOk() {
        // const userIdList = this.userList.filter(user => (user as any).checked).map(user => user.id);
        // const response = this.projectService.batchJoin(this.project.id, userIdList);
        // this.msg.info('操作成功');
        this.isVisible = false;
    }

    async ngOnInit() {
        this.getData()
    }

    async getData() {
        this.dto.Authorization = localStorage.getItem('building-token');
        // this.data = await this.projectService.getProjectList(this.dto)
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
            this.data.pageNo = 1
            this.getData()
        }, 0)
    }

    reset() {
        this.dto.page = 1
        this.dto.size = 10
        this.resetPageAndGetData()
    }
}
