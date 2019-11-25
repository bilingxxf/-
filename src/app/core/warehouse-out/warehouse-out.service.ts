import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { PagingData } from '@core/common-entity/paging-data'
import { UtilService } from '../util/util.service'
import { WarehouseOutQueryDto } from './warehouse-out-query-dto'
import { WarehouseOutItem } from './warehouse-out-item'
import { ProductTypes } from '../../constant/product-types.enum'
import { WarehousingQueryDto } from '@core/warehousing/warehousing-query-dto'
import { WarehouseType } from '../../constant/warehouse-type.enum'

@Injectable()
export class WarehouseOutService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  /**
   * 分页获取出库信息
   *
   * @param dto
   */
  list(dto: WarehousingQueryDto): Promise<PagingData<WarehouseOutItem>> {
    dto.warehouseType = WarehouseType.出库
    return this.http.get(`/warehouse-records/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

  /**
   * 获取一个区域的构件品质信息
   *
   * @param monomerId
   * @param type
   */
  async getAll(monomerId: number, type = ProductTypes.结构): Promise<WarehouseOutItem[]> {
    const dto = new WarehousingQueryDto()
    dto.queryDate = null
    dto.productType = type
    dto.size = 1000
    dto.monomerId = monomerId
    return (await this.list(dto)).data
  }
}
