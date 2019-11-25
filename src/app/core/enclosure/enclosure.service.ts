import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { EnclosureQueryDto } from '@core/enclosure/enclosure-query-dto'
import { Enclosure } from '@core/enclosure/enclosure'
import { PagingData } from '@core/common-entity/paging-data'
import { EnclosureWithPrice } from '@core/enclosure/enclosure-with-price'
import { EnclosureSummary } from './enclosure-summary'
import { plainToClass } from 'class-transformer'
import { EnclosureBusinessEntrySummary } from '@core/enclosure/enclosure-business-entry-summary'
import { RecordListDto } from './record-list-dto'

@Injectable()
export class EnclosureService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  list(dto: EnclosureQueryDto): Promise<PagingData<Enclosure>> {
    return this.http.get(`/containments/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  listByValid(dto: EnclosureQueryDto): Promise<PagingData<Enclosure>> {
    return this.http.get(`/containments/actions/query/noDelete?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  //删除修改记录
  recordList(dto: RecordListDto): Promise<PagingData<Enclosure>> {
    return this.http.get(`/product-modify/history?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  listComponent(dto: EnclosureQueryDto): Promise<PagingData<Enclosure>> {
    return this.http.get(`/structures/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // 商务录入围护
  listWithPrice(dto: EnclosureQueryDto): Promise<PagingData<EnclosureWithPrice>> {
    return this.http.get(`/containments/prices?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // 安装商务跟踪 
  listQuickWithPrice(dto: EnclosureQueryDto): Promise<PagingData<EnclosureWithPrice>> {
    return this.http.get(`/products/prices/containment/site/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   * 获取构件导入清单中的汇总数据
   *
   * @param id
   */
  getSummaryByMonomerId(id: number): Promise<EnclosureSummary> {
    return this.http.get(`/products/containments/actions/sum?${this.utilService.objToSearch({monomerId: id})}`)
      .map((res: EnclosureSummary) => plainToClass(EnclosureSummary, res))
      .toPromise()
  }

  /**
   * 获取围护商务录入合计
   *
   * @param monomerId
   */
  getBusinessEntrySummary(monomerId: number): Promise<EnclosureBusinessEntrySummary> {
    return this.http.get(`/products/prices/containment-price/actions/sum?${this.utilService.objToSearch({monomerId})}`)
      .map((res: EnclosureBusinessEntrySummary) => plainToClass(EnclosureBusinessEntrySummary, res))
      .toPromise()
  }
}
