import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { Monomer } from '@core/monomer/monomer'
import { UtilService } from '@core/util/util.service'

@Injectable()
export class MonomerService {

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    /**
     * 根据项目id获取单体
     *
     * @param projectId 项目id
     */
    getByProjectId(projectId: number): Promise<Monomer[]> {
        return this.http.get(`/monomers?${this.utilService.objToSearch({ projectId })}`).toPromise()
    }

    /**
     * 更新3D模型
     *
     * @param modelId 模型id
     */
    updateModel(monomerId, modelId: number): Promise<void> {
        return this.http.put(`/monomers/${monomerId}`, {modelProjectId: modelId})
            .toPromise()
    }

    // 短信配置  列表
    contactList(companyId: number): Promise<any> {
        return this.http.get(`/company/contact/list?${this.utilService.objToSearch({ companyId })}`).toPromise()
    }
}
