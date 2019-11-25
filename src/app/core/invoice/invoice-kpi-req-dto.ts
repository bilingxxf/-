import { InvoiceTypes } from '../../constant/invoice-types.enum'

export class InvoiceKpiReqDto {
  projectId: number
  companyId: number
  type: InvoiceTypes
}
