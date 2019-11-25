import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { Router } from '@angular/router'
import { UserService } from '../user/user.service'
import { ApprovalQueryDto } from './approval-query-dto'
import { PagingData } from '../common-entity/paging-data'
import { ApprovalListItem } from './approval-list-item'
import { plainToClass } from 'class-transformer'
import { ApprovalReqDto } from './approval-req-dto'
import { ProjectService } from '@core/project/project.service'
import { PaymentRemindService } from '@core/payment-remind/payment-remind.service'
import { MonomerService } from '../monomer/monomer.service'
import * as _ from 'lodash'
import { ProjectWorkloadService } from '@core/project-workload/project-workload.service'

@Injectable()
export class ApprovalService {

  constructor(
    private http: HttpClientService,
    private projectWorkloadService: ProjectWorkloadService,
    private utilService: UtilService,
    private userService: UserService,
    private router: Router,
    private projectService: ProjectService,
    private paymentRemindService: PaymentRemindService,
    private monomerService: MonomerService
  ) { }

  async list(dto: ApprovalQueryDto): Promise<PagingData<ApprovalListItem>> {
    dto.userId = (await this.userService.getUser()).id
    return this.http.get(`/projects/auditing/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(ApprovalListItem, res.data))
      .toPromise()
  }

  go(approval: ApprovalListItem): void {
    const path: Array<string | number> = []
    switch (approval.taskType) {
      case '新项目审批/修改':
        path.push(...['/project-detail', approval.entityId])
        break
      case '函件审批/修改':
        path.push(...['/contact-letter-detail', approval.entityId])
        break
      default:
        break
    }
    this.router.navigate(path, {
      queryParams: {
        taskId: approval.taskId
      }
    })
  }

  /**
   * 审核统一调用该函数
   *
   * querystring 参数都一样
   * 接口路径和请求体参数不一样
   * 这绝对是个(最)傻逼的设计
   *
   * @param dto
   */
  async approval(dto: ApprovalReqDto): Promise<void> {
    const queryDto = new ApprovalQueryDto()
    queryDto.size = 1000
    const approval: ApprovalListItem = (await this.list(queryDto)).data.find(o => o.taskId === dto.taskId)
    let path = ''
    let body = {}
    switch (approval.taskType) {
      case '新项目审批/修改':
        path = '/projects/actions/audit'
        body = await this.getProjectCreateAndModifyApprovalBody(approval.entityId)
        break
      case '函件审批/修改':
        path = '/letters/actions/audit'
        return this.http.get(`${path}?${this.utilService.objToSearch(dto)}`).toPromise()
    }
    return this.http.post(`${path}?${this.utilService.objToSearch(dto)}`, body).toPromise()
  }

  /**
   * 生成项目创建和修改审批用的body
   *
   * @param projectId 香
   */
  private async getProjectCreateAndModifyApprovalBody(projectId: number): Promise<object> {
    const customer = await this.projectService.getProjectCustomerDetail(projectId)
    const paymentRemindList = await this.paymentRemindService.getByProjectId(projectId)
    const monomers = await this.monomerService.getByProjectId(projectId)
    const quantityComparisonMap = _.flatten(await Promise.all(monomers.map(m => this.projectWorkloadService.getProjectWorkloadByMonomerId(m.id))))
    const project: any = await this.projectService.getProjectInfoDetail(projectId)
    if (!project.attachmentList) project.attachmentList = []
    project.attachmentList = project.attachmentList.map(o => o.id)
    project.monomers = monomers
    return { customer, paymentRemindList, quantityComparisonMap, project }
  }

}
