import { InvoiceTypes } from '../../constant/invoice-types.enum'

export class InvoiceCDto {
  /**
   * 项目id
   */
  projectId: number

  /**
   * 类型 1-收款 2-开票
   */
  type: InvoiceTypes

  /**
   * 收款/开票日期
   */
  operationDate: number

  /**
   * 收款/开票金额
   */
  amount: number

  /**
   * 备注
   */
  tip?: string

  id: number
}
