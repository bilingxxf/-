import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { PagingData } from '@core/common-entity/paging-data'
import { UtilService } from '@core/util/util.service'
import { SupplieQueryDTO } from '@core/supplie/supplie-query-dto'

@Injectable()
export class SupplieService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  // list(dto: SupportMaterialQueryDto): Promise<PagingData<SupportMaterial>> {
  //   return this.http.get(`/auxiliaries/materials/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
  // }

  fetchList(dto: SupplieQueryDTO): Promise<PagingData<any>> {
    return this.http.get(`/supplier/page-supplier-completion?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  fetchListBySite(dto: SupplieQueryDTO): Promise<PagingData<any>> {
    return this.http.get(`/sites/records/logistics/supplier/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  fetchDetailList(dto: SupplieQueryDTO): Promise<PagingData<any>> {
    return this.http.get(`/supplier/page-supplier-detail?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // listByValid(dto: SupportMaterialQueryDto): Promise<PagingData<SupportMaterial>> {
  //   return this.http.get(`/auxiliaries/materials/actions/query/noDelete?${this.utilService.objToSearch(dto)}`).toPromise()
  // }
  
  // //删除修改记录
  // recordList(dto: any): Promise<PagingData<SupportMaterial>> {
  //   return this.http.get(`/product-modify/history?${this.utilService.objToSearch(dto)}`).toPromise()
  // }

  // getTotalCountByMonomerId(monomerId: number): Promise<number> {
  //   return this.http.get(`/products/auxiliary-material/actions/sum?${this.utilService.objToSearch({monomerId})}`).toPromise()
  // }
}
