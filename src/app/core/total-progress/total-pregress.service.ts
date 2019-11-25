import { Injectable } from '@angular/core'
import { TotalPregressQueryDto } from '@core/total-progress/total-pregress-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { TotalPregressListItem } from './total-pregress-list-item'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { ProductTypes } from '../../constant/product-types.enum'

@Injectable()
export class TotalPregressService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 分页获取进度项
   *
   * @param dto
   */
  list(dto: TotalPregressQueryDto): Promise<PagingData<TotalPregressListItem>> {
    return this.http.get(`/records/total-progress/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(TotalPregressListItem, data.data))
      .toPromise()
  }

  /**
   * 获取全部进度项
   *
   * @param projectId
   */
  async getAll(projectId: number, monomerId: number, type = ProductTypes.结构): Promise<TotalPregressListItem[]> {
    const dto = new TotalPregressQueryDto()
    dto.monomerId = monomerId;
    dto.productType = type
    dto.size = 100
    dto.projectId = projectId
    return (await this.list(dto)).data
  }

  async getSum(monomerId: number, productType: number, areaDivisionId: number):Promise<any> {
    return this.http.get(`/records/total-progress/actions/sum?${this.utilService.objToSearch({
      monomerId,
      productType,
      areaDivisionId
    })}`).toPromise();
  }

}
