import { Injectable } from '@angular/core'
import { HttpClientService } from '../http-client/http-client.service'
import { MonomerService } from '../monomer/monomer.service'
import { ProjectWorkload } from '@core/project-workload/project-workload'
import { UtilService } from '../util/util.service'
import { MonomerWithWorkload } from './monomer-with-workload'

@Injectable()
export class ProjectWorkloadService {

    constructor(
        private http: HttpClientService,
        private monomerService: MonomerService,
        private utilService: UtilService
    ) { }

    /**
     * 获取单体工程量
     *
     * @param monomerId 单体id
     */
    getProjectWorkloadByMonomerId(monomerId: number): Promise<ProjectWorkload[]> {
        return this.http.get(`/projects/comparisons?${this.utilService.objToSearch({ monomerId })}`).toPromise()
    }

    /**
     * 通过项目id获取所有的工作量
     *
     * @param projectId 项目id
     */
    async getProjectWorkloads(projectId: number): Promise<MonomerWithWorkload[]> {
        const monomers = await this.monomerService.getByProjectId(projectId)
        return Promise.all(monomers.map(async m => Object.assign(m, {workloads: await this.getProjectWorkloadByMonomerId(m.id)})))
    }
}
