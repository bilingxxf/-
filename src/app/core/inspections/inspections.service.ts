import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { InspectionsQueryDto } from './inspections-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { InspectionsListItem } from './inspections-list-item'
import { plainToClass } from 'class-transformer'

@Injectable()
export class InspectionsService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 分页获取巡检报告
   *
   * @param dto
   */
  list(dto: InspectionsQueryDto): Promise<PagingData<InspectionsListItem>> {
    return this.http.get(`/inspections/reports/actions/query?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(InspectionsListItem, res.data))
      .toPromise()
  }

}
