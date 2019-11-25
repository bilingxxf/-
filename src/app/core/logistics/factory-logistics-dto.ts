// import { Paginate } from '@core/common-entity/paginate'
import { BaseQueryDTO } from '@core/base/base-query-dto'

export class FactoryLogisticsDTO extends BaseQueryDTO {

  // 查询类型 类型：1：构件，2：围护，3：辅材
  type: number

  // 查询名称或编号
  productName: string
}
