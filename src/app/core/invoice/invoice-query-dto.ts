import { Paginate } from '@core/common-entity/paginate'
import { InvoiceTypes } from '../../constant/invoice-types.enum'

export class InvoiceQueryDto extends Paginate {
  projectId: number

  type: InvoiceTypes
}
