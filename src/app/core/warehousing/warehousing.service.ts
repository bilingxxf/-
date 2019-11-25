import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { WarehousingQueryDto } from './warehousing-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { WarehousingItem } from './warehousing-item'
import { UtilService } from '../util/util.service'
import { WarehousingDateItem } from './warehousing-date-item'
import { ProductTypes } from '../../constant/product-types.enum'
import { WarehousingInboundItem } from './warehousing-inbound-item'

@Injectable()
export class WarehousingService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 分页获取入库信息
   *
   * @param dto
   */
  list(dto: WarehousingQueryDto): Promise<PagingData<WarehousingItem>> {
    return this.http.get(`/warehouse-records/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  } 

  getSum(monomerId: number): Promise<PagingData<WarehousingItem>> {
    return this.http.get(`/warehouse-records/statistics/sum?monomerId=${monomerId}`).toPromise()
  } 

  getEnclSum(monomerId: number): Promise<PagingData<WarehousingItem>> {
    return this.http.get(`/warehouse-records/statistics/sum-containment?monomerId=${monomerId}`).toPromise()
  } 

  /**
   *
   * @param dto
   */
  listByDate(dto: WarehousingQueryDto): Promise<string[]> {
    return this.http.get(`/warehouse-records/monthly-stat/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  getInboundDetailByDate(query: WarehousingQueryDto):Promise<PagingData<WarehousingInboundItem>> {
    return this.http.get(`/warehouse-records/daily-stat/actions/list?${this.utilService.objToSearch(query)}`).toPromise()
  }
  
  /**
   * 
   * 分页获取出入库看板数据
   * @param monomerId 
   * @param type 
   * @param warehouseType 
   */

  async getAll(monomerId: number, type = ProductTypes.结构, warehouseType: number): Promise<WarehousingItem[]> {
    const dto = new WarehousingQueryDto()
    dto.queryDate = null
    dto.productType = type
    dto.size = 1000
    dto.monomerId = monomerId
    dto.warehouseType = warehouseType;
    return (await this.list(dto)).data
  }
}
