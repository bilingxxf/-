import { Injectable } from '@angular/core'
import { CargoListQueryDto } from './cargo-list-query-dto'
import { CarInListQueryDto } from './carIn-list-query-dto'
import { FactoryLogisticsDTO } from '@core/logistics/factory-logistics-dto'

import { PagingData } from '../common-entity/paging-data'
import { CargoList } from '@core/cargo-list/cargo-list'
import { HttpClientService } from '../http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { CargoListDetail } from './cargo-list-detail'

@Injectable()
export class CargoListService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  list(dto: CargoListQueryDto): Promise<PagingData<CargoList>>{
    return this.http.get(`/cargoLists?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  updatalist(item){
    return this.http.get(`/plans/${item.id}`,Object.assign(item))
  }

  querylist(dto: FactoryLogisticsDTO): Promise<any> {
    return this.http.get(`/warehouse-records/details-stat/actions/cargoList?${this.utilService.objToSearch(dto)}`).toPromise()
  }
  
  queryInlist(dto: CargoListQueryDto): Promise<any> {
    return this.http.get(`/warehouse-records/details-stat/actions/in?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  fetchEnclInList(dto: CargoListQueryDto): Promise<any> {
    return this.http.get(`/warehouse-records/details-stat/actions/in/containment?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  fetchMatInList(dto: CargoListQueryDto): Promise<any> {
    return this.http.get(`/warehouse-records/details-stat/actions/in/auxiliary-material?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  getReceiptData(dto: CargoListQueryDto): Promise<PagingData<CargoList>>{
    return this.http.get(`/sites/records/cargo-list/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   * 获取详情
   *
   * @param id
   */
  d(id: number): Promise<CargoListDetail> {
    return this.http.get(`/cargoLists/${id}`).toPromise()
  }

  /**
   *获取发货清单详情
   *
   * @param {number} id
   * @returns {Promise<CargoListDetail>}
   * @memberof CargoListService
   * @author duhh
   */
  fetchShippingDetail(id: number): Promise<CargoListDetail> {
    return this.http.get(`/cargoLists/${id}`).toPromise()
  }

  // 出入库 入库详情
  inDetail(dto: CarInListQueryDto): Promise<CargoListDetail>{
    return this.http.get(`/warehouse-records/daily-stat/actions/find?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   *出入库 入库详情（围护）
   *
   * @param {CarInListQueryDto} dto
   * @returns {Promise<CargoListDetail>}
   * @memberof CargoListService
   */
  enclInDetail(dto: CarInListQueryDto): Promise<CargoListDetail>{
    return this.http.get(`/warehouse-records/daily-stat/actions/user/find-containment?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // 出入库 入库详情
  fetchDetailByOperator(dto: CarInListQueryDto): Promise<CargoListDetail>{
    return this.http.get(`/warehouse-records/daily-stat/actions/user/find?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // 出库下载
  getMonthExportUrl(monomerId: number, startDate: string, endDate: string, warehouseType): string {
    // const m = moment(date, 'YYYY-MM-DD')

    // // 处理获取这个月的情况
    // let end = m.clone().endOf('month')
    // if (end.isAfter(moment())) {
    //   end = moment()
    // }
    return `/api/warehouse-records/daily-stat/actions/export?${this.utilService.objToSearch({
      monomerId,
      productType: 1, // 目前先固定构件
      warehouseType,
      startDate,
      endDate
    })}`
  }
}
