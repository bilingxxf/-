import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { SupportMaterialQueryDto } from '@core/support-material/support-material-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { SupportMaterial } from '@core/support-material/support-material'
import { UtilService } from '@core/util/util.service'
import { SupportMaterialWithPrice } from './support-material-with-price'

@Injectable()
export class SupportMaterialService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  list(dto: SupportMaterialQueryDto): Promise<PagingData<SupportMaterial>> {
    return this.http.get(`/auxiliaries/materials/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  listByValid(dto: SupportMaterialQueryDto): Promise<PagingData<SupportMaterial>> {
    return this.http.get(`/auxiliaries/materials/actions/query/noDelete?${this.utilService.objToSearch(dto)}`).toPromise()
  }
  
  //删除修改记录
  recordList(dto: any): Promise<PagingData<SupportMaterial>> {
    return this.http.get(`/product-modify/history?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  listWithPrice(dto: SupportMaterialQueryDto): Promise<PagingData<SupportMaterialWithPrice>> {
    return this.http.get(`/auxiliaries/materials/prices?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  getTotalCountByMonomerId(monomerId: number): Promise<number> {
    return this.http.get(`/products/auxiliary-material/actions/sum?${this.utilService.objToSearch({monomerId})}`).toPromise()
  }
}
