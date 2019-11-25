import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { UserService } from '@core/user/user.service'
import { WarehousingFixStatic } from './warehousing-fix-static'
import { WarehousingFixStaticReqDto } from './warehousing-fix-static-req-dto'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { PagingData } from '@core/common-entity/paging-data'
import { ReceiptStaticTotal } from '@core/warehousing-fix-static/receipt-static-total'
import * as _ from 'lodash'
import { ProductTypes } from '../../constant/product-types.enum'
import { ReceiptAndFixStaticData } from '@core/warehousing-fix-static/receipt-and-fix-static-data'
import { ReceiptAndFixStaticDataQueryDto } from '@core/warehousing-fix-static/receipt-and-fix-static-data-query-dto'
import { BaseQueryDTO } from '@core/base/base-query-dto'
import { BaseDTO } from '@core/base/base-dto'
/**
 *
 *
 * @export
 * @class WarehousingFixStaticService
 */
@Injectable()
export class WarehousingFixStaticService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  /**
   * 获取收货/安装统计数据
   *
   * @param scanType
   * @param date
   */
  async getStaticData(dto: WarehousingFixStaticReqDto): Promise<PagingData<WarehousingFixStatic>> {
    return this.http.get(`/sites/records/receipts/action/list?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(WarehousingFixStatic, res.data))
      .toPromise()
  }

  /**
   * 获取收货统计中的总计
   *
   * @param dto
   */
  async getReceiptStaticTotal(dto: WarehousingFixStaticReqDto): Promise<ReceiptStaticTotal> {
    dto = _.cloneDeep(dto)
    dto.page = 1
    dto.size = 1000
    const total = (await this.getStaticData(dto)).data
    const staticData = new ReceiptStaticTotal()
    if (!total.length) return staticData
    const pieceWeight = total[0].productInfo.pieceWeight
    staticData.outboundQuantity = _.sumBy(total, 'outStockQuantity')
    staticData.outboundWeight = staticData.outboundQuantity * pieceWeight
    staticData.receiptQuantity = _.sumBy(total, 'recordQuantity')
    staticData.receiptWeight = staticData.receiptQuantity * pieceWeight
    return staticData
  }

  /**
   * 获取看板数据
   *
   * @param monomerId
   * @param type
   *
   */
  getPanelData(monomerId: number, type: ProductTypes): Promise<ReceiptAndFixStaticData[]> {
    const dto = new ReceiptAndFixStaticDataQueryDto()
    dto.size = 1000
    dto.type = type
    dto.monomerId = monomerId
    return this.http.get(`/sites/records/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(ReceiptAndFixStaticData, res.data))
      .map(res => res.data)
      .toPromise()
  }

  /**
   *围护-安装列表
   *
   * @param {BaseDTO} dto
   * @returns
   * @memberof WarehousingFixStaticService
   * @author duhh
   */
  async fetchListByMonthForEncl(dto: BaseDTO) {
    return await this.http.get(`/sites/records/containment/setupRecordList?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   *围护-安装列表详情
   *
   * @param {BaseQueryDTO} dto
   * @returns
   * @memberof WarehousingFixStaticService
   * @author duhh
   */
  async fetchListByDayForEncl(dto: BaseQueryDTO) {
    return await this.http.get(`/sites/records/containment/setupRecordDetailsList?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  async fetchListByMonthForStruc(dto: BaseDTO) {
    return await this.http.get(`/sites/records/structure/setupRecordList?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  async fetchListByDayForStruc(dto: BaseQueryDTO) {
    return await this.http.get(`/sites/records/structure/setupRecordDetailsList?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  async getMonthData(dto: WarehousingFixStaticReqDto) {
    return await this.http.get(`/sites/records/monthly-stat/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  async getBoardData(dto: WarehousingFixStaticReqDto) {
    return await this.http.get(`/sites/records/actions/list?${this.utilService.objToSearch(dto)}`).toPromise();
  }

  async getSetupDailyData(dto: WarehousingFixStaticReqDto){
    return await this.http.get(`/sites/records/receipts/action/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  async getSetUpstatisticsData(dto: WarehousingFixStaticReqDto) {
    return await this.http.get(`/sites/records/stat/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  async fetchSumData(monomerId:any, productType:number = 1) {
    return await this.http.get(`/sites/records/statistics/sum?${this.utilService.objToSearch({
      monomerId,
      productType
    })}`).toPromise()
  }
}
