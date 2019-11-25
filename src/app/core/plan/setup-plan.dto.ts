import { Paginate } from '@core/common-entity/paginate'

export class SetupPlanQueryDTO extends Paginate {
  demandStartDate: any;
  monomerId: number;
  submitTime: any;
  type: number;
  userId: number;
}

export class SetupHistoryDTO {
  monomerId: number;
  type: number;
  year: number;
  month: any;
  orderNum?: number;
}