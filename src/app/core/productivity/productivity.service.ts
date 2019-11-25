import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { ProductivityQueryDto } from './productivity-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { plainToClass } from 'class-transformer'
import { ProductivityListItem } from '@core/productivity/productivity-list-item'
import { Box } from '../../shared/component/multi-color-box-list/box'
import { ProductTypes } from '../../constant/product-types.enum'
import { UserAllotDetailListDto } from '@core/product-demand/user-allot-detail-list-dto'
import { UserAllotDetailDto } from '@core/product-demand/user-allot-detail-dto'
import { AllotDetailListDto } from '@core/product-demand/allot-detail-list-dto'
import * as moment from 'moment'

@Injectable()
export class ProductivityService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  list(dto: ProductivityQueryDto): Promise<PagingData<ProductivityListItem>> {
    return this.http.get(`/manufactures/records/products/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(ProductivityListItem, res.data))
      .toPromise()
  }

  getBoxs(monomerId: number, productType: ProductTypes, finishType: number, serialNo: string): Promise<Box[]> {
    const dto = new ProductivityQueryDto(productType)
    dto.monomerId = monomerId
    dto.size = 1000
    dto.serialNo = serialNo
    return this.http.get(`/manufactures/records/products/actions/list?${this.utilService.objToSearch(dto)}`)
      .map(res => plainToClass(ProductivityListItem, res.data).map(o => o.toBox(productType, finishType)))
      .toPromise()
  }

  getBoardData(monomerId: number, productType: number, yearMonth: string): Promise<any> {
    return this.http.get(`/manufactures/records/record-days/actions/list?${this.utilService.objToSearch({
      monomerId,
      productType,
      yearMonth
    })}`).toPromise()
  }

  getBoardDetail(query: ProductivityQueryDto): Promise<any> {
    return this.http.get(`/manufactures/records/output-info/actions/query?${this.utilService.objToSearch(query)}`).toPromise()
  }

  // 根据区域id查询制造任务
  // getTaskList(dto: ProductivityQueryDto): Promise<any> {
  //   return this.http.get(`/manufacturePlan/find/list?${this.utilService.objToSearch(dto)}`).toPromise()
  // }

  // 根据单体id和用户id分页查询制造任务
  getUserTaskList(dto: UserAllotDetailDto): Promise<any> {
    return this.http.get(`/manufacturePlan/find/listUserPlan?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // 根据单体id和用户id查询单体累计数量和重量
  fetchUserCumulativeData(dto: UserAllotDetailDto): Promise<any> {
    return this.http.get(`/manufacturePlan/get/user-summary?${this.utilService.objToSearch(dto)}`).toPromise()
  }
  

  // 根据单体id和用户id分页查询制造任务
  exportUserTaskAllot(dto: UserAllotDetailDto) {
    window.open(`/api/manufacturePlan/export?${this.utilService.objToSearch(dto)}`)
  }

  // 分配用户列表
  getUserAllotList(dto: UserAllotDetailListDto): Promise<any> {
    return this.http.get(`/manufacturePlan/find/listUser?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  // 分配用户列表（按日期查询）
  fetchAllotListByDate(dto: UserAllotDetailListDto): Promise<Array<AllotDetailListDto>> {
    return this.http.get(`/manufacturePlan/find/list-monomer?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  

  /**
   * 获取导出某月的某种产品的生产信息列表url
   *
   * @param monomerId
   * @param date YYYY-MM 要导出的月
   */
  getMonthTotalExportUrl(monomerId: number, date: string): string {
    const m = moment(date, 'YYYY-MM-DD')

    // 处理获取这个月的情况
    let end = m.clone().endOf('month')
    if (end.isAfter(moment())) {
      end = moment()
    }

    return `/api/manufactures/records/output-info/actions/export/month?${this.utilService.objToSearch({
      monomerId,
      productType: 1, // 目前先固定构件
      startDate: m.startOf('month').format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
    })}`
  }

}
