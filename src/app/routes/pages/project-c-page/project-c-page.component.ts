import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { ProjectInfoCDto } from '@core/project/project-info-c-dto'
import { ProjectCustomerCreateDto } from '@core/project/project-customer-create-dto'
import { ProjectPaymentRemindCDto } from '../../../core/project/project-payment-remind-c-dto'
import { ProjectWorkloadCDto } from '../../../core/project/project-workload-c-dto'
import { ProjectCDto } from '../../../core/project/project-c-dto'
import * as _ from 'lodash'
import { ProjectService } from '@core/project/project.service'
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd'
import { UserService } from '../../../core/user/user.service'
import { MonomerService } from '@core/monomer/monomer.service'
import { PaymentRemindService } from '@core/payment-remind/payment-remind.service'
import { PaymentRemind } from '@core/payment-remind/payment-remind'
import { ProjectWorkloadService } from '@core/project-workload/project-workload.service'

@Component({
    selector: 'app-project-c-page',
    templateUrl: './project-c-page.component.html',
    styleUrls: [ './project-c-page.component.less' ],
})
export class ProjectCPageComponent implements OnInit {
    current = 0

    projectInfoCDto = new ProjectInfoCDto()

    projectCustomerCreateDto = new ProjectCustomerCreateDto()

    projectPaymentRemindCDto: ProjectPaymentRemindCDto[] = []

    projectId: number

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private msg: NzMessageService,
        private userService: UserService,
        private notification: NzNotificationService,
        private monomerService: MonomerService,
        private paymentRemindService: PaymentRemindService,
        private projectWorkloadService: ProjectWorkloadService


    ) { }

    async ngOnInit() {
        this.projectInfoCDto.companyId = await this.userService.getCurrentUserCompanyId()
        this.route.queryParams.subscribe(async query => {
            // console.log(query);
            if (query.projectId) {
                const projectId = this.projectId = Number(query.projectId);
                const projectInfo = await this.projectService.getProjectInfoDetail(projectId);
                this.projectPaymentRemindCDto =  await this.paymentRemindService.getByProjectId(projectId)
                // this.projectPaymentRemindCDto.forEach(val => {
                //     val.projectId = this.projectId
                // })
                let monomers = await this.projectWorkloadService.getProjectWorkloads(projectId)
                console.log(this.projectPaymentRemindCDto);
                // const monomers = await this.monomerService.getByProjectId(projectId);
                Object.assign(this.projectInfoCDto, projectInfo)
                this.projectInfoCDto.monomers = (monomers as any)
                this.projectCustomerCreateDto = await this.projectService.getProjectCustomerDetail(projectId);
                console.log(this.projectInfoCDto);
            }
        })
    }


    async updateProject() {

    }

    async ok() {
        try {
            const dto = new ProjectCDto()
            dto.userId = (await this.userService.getUser()).id
            dto.customer = this.projectCustomerCreateDto
            dto.paymentRemindList = this.projectPaymentRemindCDto
            dto.project = this.projectInfoCDto
            dto.quantityComparisonMap = _.flatten(this.projectInfoCDto.monomers.map(m => {
                m.workloads.forEach(o => o.monomerName = m.name)
                return m.workloads
            }))
            if (this.projectId) {
                dto.paymentRemindList.forEach(val => {
                    val.projectId = this.projectId
                })
                await this.projectService.update(dto, this.projectId)
                this.notification.success('修改成功', '')
            } else {
                this.projectId = await this.projectService.c(dto);
                this.notification.success('创建成功', '')
            }
            this.router.navigate(['/project-detail', this.projectId])
            // this.notification.success('创建成功', '')
        } catch (e) {
            this.msg.error(e.error.message)
        } 
    }

    goPreStep() {
        this.current--
    }

    goNextStep() {
        this.current++
    }
}
