import { Injectable } from '@angular/core'
import { HttpClientService } from '../http-client/http-client.service'
import { UtilService } from '../util/util.service'
import { ProductDemandQueryDto } from '@core/product-demand/product-demand-query-dto'
import { PagingData } from '../common-entity/paging-data'
import { ProductDemand } from './product-demand'
import { plainToClass } from 'class-transformer'
import { ProductDemandPlanCDto } from '@core/product-demand/product-demand-plan-c-dto'
import { TaskDto } from '@core/product-demand/task-dto'
import { ProductDemandPlanListItem } from './product-demand-plan-list-item'
import { ProductTypes } from 'app/constant/product-types.enum'

@Injectable()
export class ProductDemandService {
  date: Date = new Date

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  c(dto: ProductDemandPlanCDto): Promise<void> {
    return this.http.post(`/product-demand/plans`, dto).toPromise()
  }

  list(dto: ProductDemandQueryDto): Promise<PagingData<ProductDemand>> {
    return this.http.get(`/product-demand/plans/products/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(ProductDemand, data.data))
      .toPromise()
  }
  //GET /api/manufacturePlan/list
  list2(dto: ProductDemandQueryDto): Promise<PagingData<ProductDemand>> {
    return this.http.get(`/manufacturePlan/list?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(ProductDemand, data.data))
      .toPromise()
  }

  async batch(dtos: ProductDemandPlanCDto[]):Promise<any> {
    return await this.http.post(`/product-demand/plans/actions/batch_save`, dtos).toPromise();
  }
  //保存计划
  async batch11(dtos: any[]):Promise<any> {
    return await this.http.post(`/manufacturePlan/save`, dtos).toPromise();
  }

  /**
   * 重新分配任务
   *
   * @param {number} id 区域id
   * @returns {Promise<any>}
   * @memberof ProductDemandService
   */
  reassignTasks(id: number): Promise<any> {
    return this.http.put(`/manufacturePlan/update/reset?areaDivisionId=${id}`, {}).toPromise()
  }

  async getAll(areaId: number, type = ProductTypes.结构): Promise<ProductDemand[]> {
    const dto = new ProductDemandQueryDto()
    dto.productType = type
    dto.size = 1000
    dto.areaDivisionId = areaId
    return (await this.list(dto)).data
  }

  async getAllTask(areaId: number, type = ProductTypes.结构): Promise<ProductDemand[]> {
    const dto = new ProductDemandQueryDto()
    dto.productType = type
    dto.size = 1000
    dto.areaDivisionId = areaId
    return (await this.list2(dto)).data
  }

  /**
   * 需求计划汇总清单中的表格
   *
   * @param dto
   */
  productDemandPlanList(dto: ProductDemandQueryDto): Promise<PagingData<ProductDemandPlanListItem>> {
    return this.http.get(`/product-demand/plans/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(ProductDemandPlanListItem, data.data))
      .toPromise()
  }

}
