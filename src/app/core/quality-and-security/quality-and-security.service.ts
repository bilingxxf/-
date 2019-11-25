import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { PagingData } from '@core/common-entity/paging-data'
import { QualityAndSecurityQueryDto } from '@core/quality-and-security/quality-and-security-query-dto'
import { QualityAndSecurityListItem } from './quality-and-security-list-item'
import { plainToClass } from 'class-transformer'

@Injectable()
export class QualityAndSecurityService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 分页获取巡检报告
   *
   * @param dto
   */
  list(dto: QualityAndSecurityQueryDto): Promise<PagingData<QualityAndSecurityListItem>> {
    return this.http.get(`/quality-safety-reports/actions/query?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(QualityAndSecurityListItem, res.data))
      .toPromise()
  }

  close(id: number): Promise<void> {
    return this.http.put(`/quality-safety-reports/${id}`, {}).toPromise()
  }

}
