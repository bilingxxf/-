import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { FixPlanQueryDto } from './fix-plan-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { FixPlanListItem } from './fix-plan-list-item'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { ProductTypes } from 'app/constant/product-types.enum'
import { FixPlanTypes } from '../../constant/fix-plan-types.enum'
import { FixPlanCreateDto } from './fix-plan-create-dto'
import { FixPlanSummaryItem } from '@core/fix-plan/fix-plan-summary-item'
import { FixPlanSummaryQueryDto } from './fix-plan-summary-query-dto'
import { ProductDemandPlanCDto } from '@core/product-demand/product-demand-plan-c-dto'
import { TaskDto } from '@core/product-demand/task-dto'
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable()
export class FixPlanService {
  date = new Date()
  plans: any[] = [];
  visible = false;


  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
  ) { }

  list(dto: FixPlanQueryDto): Promise<PagingData<FixPlanListItem>> {
    return this.http.get(`/products/setup-plans/products/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(FixPlanListItem, data.data))
      .toPromise()
  }

  summaryList(dto: FixPlanSummaryQueryDto): Promise<PagingData<FixPlanSummaryItem>> {
    return this.http.get(`/products/setup-plans/actions/query?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(FixPlanSummaryItem, data.data))
      .toPromise()
  }

  async getAll(areaDivisionId: number, productType: ProductTypes, fixPlanType: FixPlanTypes): Promise<FixPlanListItem[]> {
    const dto = new FixPlanQueryDto()
    dto.areaDivisionId = areaDivisionId
    dto.productType = productType 
    dto.type = fixPlanType
    dto.size = 1000
    return (await this.list(dto)).data
  }

  c(dto: FixPlanCreateDto): Promise<void> {
    return this.http.post(`/products/setup-plans`, dto).toPromise()
  }

  async getAllFixPlans(query: FixPlanQueryDto):Promise<any> {
    return await this.http.get(`/products/setup-plans/records/actions/list?${this.utilService.objToSearch(query)}`).toPromise()
  }

  async batch(dtos: ProductDemandPlanCDto[]):Promise<any> {
    return await this.http.post(`/products/setup-plans/actions/batch_save`, dtos).toPromise()
  }

  addplan(item: ProductDemandPlanCDto) {
    if (!this.plans.find(val => {
      return val.productId === item.productId
    })) {
      this.plans.push(item);
      this.visible = true;
    }
  }

  addplan1(item: TaskDto) {
    if (!this.plans.find(val => {
      return val.productId === item.productId
    })) {
      this.plans.push(item);
      this.visible = true;
    }
  }

}
