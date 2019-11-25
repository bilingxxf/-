import * as _ from 'lodash'
import * as moment from 'moment'
import { Injectable } from '@angular/core'
import { SimpleTableColumn } from '@delon/abc'
import { ProjectTableColums } from '../../constant/project-table-columns.constant'
import { ProjectCDto } from '@core/project/project-c-dto'
import { HttpClientService } from '@core/http-client/http-client.service'
import { Project } from './project'
import { ProjectQueryDto } from '@core/project/project-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { UtilService } from '../util/util.service'
import { ProjectCustomerInfo } from '@core/project/project-customer-info'
import { ProjectGetTotalPriceResDto } from '../product/project-get-total-price-res-dto'
import { ProjectListItem } from '@core/project/project-list-item'
import { plainToClass } from 'class-transformer'
import { UserService } from '../user/user.service'
import { Http, Headers } from '@angular/http'
import { MonomerService } from '@core/monomer/monomer.service'

@Injectable()
export class ProjectService {

    constructor(
        private http: HttpClientService,
        private utilService: UtilService,
        private userService: UserService,
        private monomerService: MonomerService,
        private _http: Http
    ) { }

    /**
     * 创建项目
     * 返回项目id
     *
     * @param dto
     */
    c(dto: ProjectCDto): Promise<number> {
        return this.http.post('/projects/actions/create', dto).toPromise()
    }

    async update(dto: ProjectCDto, id: number):Promise<any> {
        return await this.http.put(`/projects/contracts/actions/update?projectId=${id}`, dto).toPromise()
    }

    list(dto: ProjectQueryDto): Promise<PagingData<ProjectListItem>> {
        return this.http.get(`/projects?${this.utilService.objToSearch(dto)}`)
            .do(res => plainToClass(ProjectListItem, res))
            .toPromise()
    } 

    async getProjectList(dto: ProjectQueryDto): Promise<PagingData<ProjectListItem>> {
        return this.http.get(`/projects/users/links/projects/actions/list?${this.utilService.objToSearch(dto)}`)
            .do(res => plainToClass(ProjectListItem, res))
            .toPromise()
    }

    async getAll(): Promise<ProjectListItem[]> {
        const dto = new ProjectQueryDto()
        dto.size = 1000
        return (await this.list(dto)).data
    }

    /**
     * 获取项目信息详情
     *
     * @param id
     */
    getProjectInfoDetail(id: number): Promise<Project> {
        return this.http.get(`/projects/${id}`).toPromise()
    }

    /**
     * 获取项目客户信息详情
     *
     * @param id
     */
    getProjectCustomerDetail(projectId: number): Promise<ProjectCustomerInfo> {
        return this.http.get(`/customers?${this.utilService.objToSearch({ projectId })}`).toPromise()
    }

    /**
     * 获取项目id
     *
     * @param projectId
     */
    async getProjectTotalPrice(projectId: number): Promise<ProjectGetTotalPriceResDto> {
        let dto: ProjectGetTotalPriceResDto = await this.http.get(`/products/prices/actions/sum?${this.utilService.objToSearch({ projectId })}`).toPromise()
        if (dto) return dto

        // 处理为null的情况
        dto = new ProjectGetTotalPriceResDto()
        dto.totalFinishedProductPrice = 0
        dto.totalUnitFixPrice = 0
        return dto
    }

    /**
     * 根据单体id 商务录入合计
     *
     * @param monomerId
     */
    async getMonomerIdTotalPrice(monomerId: number): Promise<ProjectGetTotalPriceResDto> {
        let dto: ProjectGetTotalPriceResDto = await this.http.get(`/products/prices/product/sum?${this.utilService.objToSearch({ monomerId })}`).toPromise()
        if (dto) return dto

        // 处理为null的情况
        dto = new ProjectGetTotalPriceResDto()
        dto.totalFinishedProductPrice = 0
        dto.totalUnitFixPrice = 0
        return dto
    }


    deleteLineRole(id: number): Promise<ProjectCustomerInfo> {
        return this.http.delete(`/ProductionLineRoleLink/delete?${this.utilService.objToSearch({ id })}`).toPromise()
    }
    deleteLineUser(id: number):  Promise<ProjectCustomerInfo> {
        return this.http.delete(`/ProductionLineUserLink/delete?${this.utilService.objToSearch({ id })}`).toPromise()
    }

    /**
     * return deep cloned project table columns
     */
    getTableColumns(): SimpleTableColumn[] {
        return _.cloneDeep(ProjectTableColums)
    }

    /**
     * 生成合同编号
     *
     * @param companyId
     */
    async genContractNumber(companyId?: number): Promise<string> {
        if (!companyId) companyId = (await this.userService.getUser()).companyId
        return this.http.get(`/projects/contract-nos/actions/generator?${this.utilService.objToSearch({ companyId })}`).toPromise()
    }


    async batchJoin(projectId: number, userIdList: number[]):Promise<any> {
        return this.http.post(`/projects/users/links/actions/batch-save?${this.utilService.objToSearch({
            projectId,
            userIdList
        })}`).toPromise()
    }

    async join(projectId: number, userId: number):Promise<any> {
        return this.http.post(`/projects/users/links`, {
            projectId,
            userId
        }).toPromise();
    }

    async remove(projectId: number, userId: number):Promise<any> {
        return this.http.post(`/projects/users/links/actions/remove?${
            this.utilService.objToSearch({
                projectId,
                userId
            })
        }`).toPromise()
    }

    /**
     * 将公司全部员工加入项目 或 移除项目下所有项目成员
     *
     * @param {number} projectId 项目id
     * @param {number} type 0：全选，1：全不选
     * @returns {Promise<any>}
     * @memberof ProjectService
     * @author duhh
     */
    async joinRoRemove(projectId: number, type: number):Promise<any> {
        return this.http.post(`/projects/users/links/actions/all-save-or-remove?${
            this.utilService.objToSearch({
                projectId,
                type
            })
        }`).toPromise().catch(() => false)
    }

    getMockData(): any[] {
        return Array(100).fill({}).map((item: any, idx: number) => {
            return {
                id: idx,
                name: `项目${idx + 1}`,
                totalDate: '90天',
                endDate: moment().add(idx + 1, 'M').valueOf(),
                timeCost: '24天',
                timeRatio: '23.5%',
                completeContractAmount: '32万',
                completeContractRatio: '48%',
                status: _.random(0, 4)
            }
        })
    }

    uploadModel(monomerId: number, modelFileName: string): Promise<{success: boolean, projectId: number}> {
        const headers = new Headers()
        const token = localStorage.getItem('building-token')
        if (token) headers.append('Authorization', `cat ${token}`)
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        return this._http.post(`/engine/User/UploadFile.do`, this.utilService.objToSearch({
            MileageID: monomerId,
            SpecialtyName: Date.now(),
            ModelName: Date.now(),
            selTools: 1,
            hid_modelFile: modelFileName,
            uploader_0_name: modelFileName,
            uploader_0_status: 'done',
            uploader_count: 1,
            rboIsPublic: 0
        }), { headers })
        .map(res => res.json())
        .toPromise()
    }

    checkModelNameIsUnique(modelName: string): Promise<boolean> {
        const headers = new Headers()
        const token = localStorage.getItem('building-token')
        if (token) headers.append('Authorization', `cat ${token}`)
        return this._http.get(`/engine/User/GetModelIsExist.do?PlanPath=${modelName}`, { headers })
        .map(res => res.json().success)
        .toPromise()
    }

    // 我的项目  报表中心
    async reportTable(companyId: number, yearAndMonthDate: string, type: number):Promise<any> {
        return this.http.get(`/manufactures/records/record/company/productList?${
            this.utilService.objToSearch({
                companyId,
                yearAndMonthDate,
                type
            })
        }`).toPromise()
    }
     // 我的项目  报表中心详情
     async reportDetail(companyId: number, startDate: string, endDate: string):Promise<any> {
        return this.http.get(`/manufactures/records/record/company/productDetails?${
            this.utilService.objToSearch({
                companyId,
                startDate,
                endDate
            })
        }`).toPromise()
    }

    async reportGroupDetail(userId: string,isFinished: string,companyId: number, startDate: string, endDate: string):Promise<any> {
        return this.http.get(`/manufactures/records/record/company/productDetails?${
            this.utilService.objToSearch({
                userId,
                isFinished,
                companyId,
                startDate,
                endDate
            })
        }`).toPromise()
    }

    // TODO: 待修改
    // 项目报表 
    async reportProjectTable(projectId: number, yearAndMonthDate: string, type: number):Promise<any> {
        return this.http.get(`/manufactures/records/record/project/productList?${
            this.utilService.objToSearch({
                projectId,
                yearAndMonthDate,
                type
            })
        }`).toPromise()
    }
     // 项目报表详情
     async reportProjectDetail(projectId: number, startDate: string, endDate: string, userId, isFinished):Promise<any> {
        return this.http.get(`/manufactures/records/record/project/productDetails?${
            this.utilService.objToSearch({
                projectId,
                startDate,
                endDate,
                userId: userId  ? userId : null,
                isFinished: isFinished != null && isFinished != undefined  ? isFinished : null,
            })
        }`).toPromise()
    }

    /**
     *围护班组月产量报表
     *
     * @param {number} projectId 项目id
     * @param {string} startDate 开始时间
     * @param {string} endDate 结束时间
     * @returns {Promise<any>}
     * @memberof ProjectService
     * @author duhh
     */
    async reportByEncl(projectId: number, startDate: string, endDate: string):Promise<any> {
        return this.http.get(`/manufactures/records/project/containment/productList?${
            this.utilService.objToSearch({
                projectId,
                startDate,
                endDate
            })
        }`).toPromise()
    }

    /**
     *围护班组月产量详情
     *
     * @param {number} projectId 项目id
     * @param {string} startDate 开始时间
     * @param {string} endDate 结束时间
     * @param {*} userId
     * @returns {Promise<any>}
     * @memberof ProjectService
     */
    async reportDetailByEncl(projectId: number, startDate: string, endDate: string, userId: any):Promise<any> {
        return this.http.get(`/manufactures/records/project/containment/productDetails?${
            this.utilService.objToSearch({
                projectId,
                startDate,
                endDate,
                userId: userId  ? userId : null
            })
        }`).toPromise()
    }


}
