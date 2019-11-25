import { Injectable } from '@angular/core';
import { UtilService } from '@core/util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { PagingData } from '@core/common-entity/paging-data'
import { PackingListDTO } from './packing-list-dto'

@Injectable()
export class PackingListService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  fetchPackingList(dto: PackingListDTO): Promise<PagingData<any>> {
    return this.http.get(`/productBag/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  fetchPackDetail(dto: any): Promise<PagingData<any>> {
    return this.http.get(`/productBag/get?${this.utilService.objToSearch(dto)}`).toPromise()
  }

}
