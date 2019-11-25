import { InvoiceListItem } from './invoice-list-item'
import { PagingData } from '@core/common-entity/paging-data'

export class InvoicePagingData extends PagingData<InvoiceListItem> {
  /**
   * 总计
   *
   * 单位: 元
   */
  sum: number

  constructor() {
    super()
  }
}
