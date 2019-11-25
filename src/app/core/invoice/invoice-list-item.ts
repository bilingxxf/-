import { InvoiceTypes } from '../../constant/invoice-types.enum'
export class InvoiceListItem {
  /**
   * 金额
   *
   * 单位: 元
   */
  amount: number

  createTime: number

  id: number

  operationDate: number

  projectId: number

  tip: string

  type: InvoiceTypes
}
