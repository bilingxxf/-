import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { ComponentQueryDto } from './component-query-dto'
import { RecordListDto } from './record-list-dto'
import { UtilService } from '@core/util/util.service'
import { ProductComponent } from '@core/product/product-component'
import { ProductComponentWithPrice } from '@core/product/product-component-with-price'
import { ProductSetPriceDto } from './product-set-price-dto'
import { ProductSubcontract } from '@core/product/product-subcontract'
import { ProductTypes } from '../../constant/product-types.enum'
import { ProductSubcontractCDto } from './product-subcontract-c-dto'
import { ProductQualityQueryDto } from './product-quality-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { ProductQualityItem } from '@core/product/product-quality-item'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { AreaComponentSummaryItem } from '@core/product/area-component-summary-item'
import { AreaComponentSummary } from './area-component-summary-item'
import { ComponentBusinessEntrySummary } from '@core/product/component-business-entry-summary'
import { ComponentBusinessEntrySummaryItem } from './component-business-entry-summary'
import { PrintHistory, PrientHistoryQueryDTO } from './product-print-history.dto';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 分页获取构件
   *
   * @param dto
   */
  // listComponent(dto: ComponentQueryDto): Promise<PagingData<ProductComponent>> {
  //   return this.http.get(`/structures/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
  // }
  listComponent(dto: ComponentQueryDto): Promise<PagingData<ProductComponent>> {
    return this.http.get(`/structures/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  //删除修改记录
  recordList(dto: RecordListDto): Promise<PagingData<ProductComponent>> {
    return this.http.get(`/product-modify/history?${this.utilService.objToSearch(dto)}`).toPromise()
  }
  
  listByAreaAndLine(dto: ComponentQueryDto): Promise<PagingData<ProductComponent>> {
    return this.http.get(`/manufacturePlan/find/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  strucListByArea(dto: ComponentQueryDto): Promise<PagingData<ProductComponent>> {
    return this.http.get(`/structures/actions/query/noDelete?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  strucListByAreaForEng(dto: ComponentQueryDto): Promise<PagingData<ProductComponent>> {
    return this.http.get(`/manufacturePlan/find/engineering/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }
  
//	list(dto: ProductivityQueryDto): Promise<PagingData<ProductivityListItem>> {
//  return this.http.get(`/manufactures/records/products/actions/list?${this.utilService.objToSearch(dto)}`)
//	    .do(res => res.data = plainToClass(ProductivityListItem, res.data))
//	    .toPromise()
//	}

  /**
   * 分页获取用户商务录入的构件列表 商务录入
   *
   * @param dto
   */
  listComponentForBusinessEntry(dto: ComponentQueryDto): Promise<PagingData<ProductComponentWithPrice>> {
    return this.http.get(`/structures/prices?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   * 分页获取用户商务录入的构件列表 安装商务跟踪
   *
   * @param dto
   */
  listComponentQuickBusinessEntry(dto: ComponentQueryDto): Promise<PagingData<ProductComponentWithPrice>> {
    return this.http.get(`/products/prices/structure/site/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   * 设置构件价格
   *
   * @param dto
   */
  setPrice(dto: ProductSetPriceDto): Promise<void> {
    return this.http.post('/products/prices', dto).toPromise()
  }

// 设置围护价格
setContainPrice(dto: ProductSetPriceDto) {
  return this.http.post('/products/prices/containment/save', dto).toPromise()
}

  /**
   * 单体id或者区域id
   *
   * @param id 单体id或者区域id
   * @param type 产品的类型
   */
  getProductSubtract(id: number, type: ProductTypes): Promise<ProductSubcontract[]> {
    return this.http.get(`/products/subcontracts/actions/list?${this.utilService.objToSearch({
      monomerId: id,
      type
    })}`)
    .map(res => plainToClass(ProductSubcontract, res))
    .toPromise()
  }

  /**
   * 设置产品分包
   *
   * @param dto
   */
  setProductSubtract(dto: ProductSubcontractCDto): Promise<void> {
    return this.http.post(`/products/subcontracts`, dto).toPromise()
  }

  /**
   * 分页获取一个区域的构件品质信息
   *
   * @param dto
   */
  async getProductQuality(dto: ProductQualityQueryDto): Promise<PagingData<ProductQualityItem>> {
    const data: PagingData<ProductQualityItem> = await this.http.get(`/quantity-inspection-records/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
    data.data.forEach(o => o.inspectionStats = o.inspectionStats ? o.inspectionStats : {
      finishedFailedQuantity: 0,
      finishedPassedQuantity: 0,
      semiFinishedFailedQuantity: 0,
      semiFinishedPassedQuantity: 0
    })
    return data
  }

  /**
   * 获取一个区域的构件品质信息
   *
   * @param monomerId
   * @param type
   */
  async getAllProductQuality(monomerId: number, type = ProductTypes.结构): Promise<ProductQualityItem[]> {
    const dto = new ProductQualityQueryDto()
    dto.size = 1000
    dto.monomerId = monomerId
    dto.type = type
    return (await this.getProductQuality(dto)).data
  }
	

  /**
   * 导入确认
   *
   * @param key
   * @param isPassed
   */
  importConfirm(key: string, isPassed: boolean): Promise<void> {
    return this.http.post(`/products/actions/confirm?${this.utilService.objToSearch({ key, isPassed })}`, { key, isPassed }).toPromise()
  }

  /**
   * 获取一个单体下区域构件的汇总信息
   *
   * @param monomerId 单体id
   */
  async getAreaComponentSummary(monomerId: number): Promise<AreaComponentSummary> {
    const data = new AreaComponentSummary()
    data.items = await this.http.get(`/products/area-stat/actions/list?${this.utilService.objToSearch({monomerId})}`)
      .map(res => plainToClass(AreaComponentSummaryItem, res))
      .toPromise()
    return data
  }

  /**
   * 获取一个区域的构件汇总信息
   *
   * @param monomerId
   * @param areaId
   */
  async getAreaComponentSummaryItem(monomerId: number, areaId: number): Promise<AreaComponentSummaryItem> {
    const summary = await this.getAreaComponentSummary(monomerId)
    return summary.findByAreaId(areaId)
  }

  

  /**
   * 获取结构商务录入的汇总
   *
   * @param monomerId
   */
  async getComponentBusinessEntrySummary(monomerId: number): Promise<ComponentBusinessEntrySummary> {
    const summary = new ComponentBusinessEntrySummary()
    summary.items = await this.http.get(`/products/prices/area-price-stat/actions/list?${this.utilService.objToSearch({monomerId})}`)
      .map(res => plainToClass(ComponentBusinessEntrySummaryItem, res))
      .toPromise()

    return summary
  }

  async uploadPrintHis(query: PrintHistory[]):Promise<any> {
    return await this.http.post('/prints/histories', query).toPromise()
  }

  async uploadPrintHisByProject(query: PrintHistory[]):Promise<any> {
    return await this.http.post('/prints/histories/batch-save', query).toPromise()
  }

  async getPrintHis(query: PrientHistoryQueryDTO):Promise<any> {
    return await this.http.get(`/prints/histories/actions/query?${this.utilService.objToSearch(query)}`).toPromise();
  }

  async getPrintHisByTaskId(query: PrientHistoryQueryDTO):Promise<any> {
    return await this.http.get(`/prints/histories/actions/list?${this.utilService.objToSearch(query)}`).toPromise();
  }
  
  /**
   * 
   * @param id 
   * @param status 
   * 1 进行中 2暂停
   */

  async updateProductStatus(id: number, status: number):Promise<any> {
    return await this.http.put(`/products/${id}/status/actions/update?status=${status}`, {}).toPromise();
  }

  async removeProducts(id: number):Promise<any> {
    return await this.http.delete(`/products/${id}`).toPromise();
  } 

  // 围护删除
  async containRemoveDel(id: number):Promise<any> {
    return await this.http.delete(`/containments/${id}`).toPromise();
  }

  async auxiliaryRemoveDel(id: number):Promise<any> {
    return await this.http.delete(`/auxiliaries/materials/${id}`).toPromise();
  }

  async deleteStructures(id: number, description: string):Promise<any> {
    return await this.http.delete(`/products/${id}?${this.utilService.objToSearch({
      description
    })}`).toPromise();
  }

  async updateStructures(id: number, row: any):Promise<any> {
    console.log(row)
    return await this.http.put(`/structures/${id}`, row).toPromise();
  }

  

  async updateContainment(id: number, row: any):Promise<any> {
    return await this.http.put(`/containments/${id}`, row).toPromise()
  }

  async updateMaterials(id: number, row: any):Promise<any> {
    return await this.http.put(`/auxiliaries/materials/${id}`, row).toPromise();
  }

  async removeAll(ids: number[]):Promise<any> {
    return await this.http.delete(`/products/actions/batch-remove?idList=${ids}`).toPromise();
  }

  async clear(monomerId: number, areaId?: number, description?: string){
    return await this.http.delete(`/products/actions/clear?${this.utilService.objToSearch({
      monomerId,
      areaDivisionId: areaId,
      description
    })}`).toPromise()
  }

  async cleaContain(monomerId: number, description?: string){
    return await this.http.delete(`/products/actions/clear/containment?${this.utilService.objToSearch({
      monomerId,
      description
    })}`).toPromise()
  }

  async cleaAuxiliary(monomerId: number, description?: string){
    return await this.http.delete(`/products/actions/clear/auxiliary-material?${this.utilService.objToSearch({
      monomerId,
      description
    })}`).toPromise()
  }
}
