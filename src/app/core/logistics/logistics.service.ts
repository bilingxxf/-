import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { FactoryLogisticsDTO } from './factory-logistics-dto'

@Injectable()
export class LogisticsService {

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    fetchFactoryLogistics(dto:FactoryLogisticsDTO): Promise<any> {
        return this.http.get(`/sites/records/logistics/factory/list?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    // /**
    //  * 根据项目id获取单体
    //  *
    //  * @param projectId 项目id
    //  */
    // getByProjectId(projectId: number): Promise<Monomer[]> {
    //     return this.http.get(`/monomers?${this.utilService.objToSearch({ projectId })}`).toPromise()
    // }

    // /**
    //  * 更新3D模型
    //  *
    //  * @param modelId 模型id
    //  */
    // updateModel(monomer: Monomer, modelId: number): Promise<void> {
    //     return this.http.put(`/monomers/${monomer.id}`, Object.assign(monomer, {modelProjectId: modelId}))
    //         .toPromise()
    // }

    // // 短信配置  列表
    // contactList(companyId: number): Promise<any> {
    //     return this.http.get(`/company/contact/list?${this.utilService.objToSearch({ companyId })}`).toPromise()
    // }
}
