import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { SubcontractorQueryDto } from '@core/subcontractor/subcontractor-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { Subcontractor } from '@core/subcontractor/subcontractor'
import { UtilService } from '@core/util/util.service'

@Injectable()
export class SubcontractorService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  list(dto: SubcontractorQueryDto): Promise<PagingData<Subcontractor>> {
    return this.http.get(`/subcontractors?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /** 获取全部 */
  async getAll(): Promise<Subcontractor[]> {
    const dto = new SubcontractorQueryDto()
    dto.size = 1000
    return (await this.list(dto)).data
  }
}
