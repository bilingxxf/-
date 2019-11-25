import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { ProductISListQueryDTO } from '@core/quality-and-security/product-is-list-query-dto'
import { ProductISDetailQueryDTO } from './product-is-detail-query-dto'

@Injectable()
export class QualitySecurityService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 加载品检报表
   *
   * @param dto
   */
  fetchProductISList(dto: ProductISListQueryDTO): Promise<any> {
    return this.http.get(`/quantity-inspection-records/monomer/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  fetchProductISDetail(dto: ProductISDetailQueryDTO): Promise<any> {
    return this.http.get(`/quantity-inspection-records/monomer/details?${this.utilService.objToSearch(dto)}`).toPromise()
  }

}
