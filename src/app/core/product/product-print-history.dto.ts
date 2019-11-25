import { Paginate } from '../common-entity/paginate'


export class PrintHistory {
  productId: number;
  quantity: number;
  projectId: number;
  manufacturePlanId: number;
  constructor() {}
}

export class PrientHistoryQueryDTO extends Paginate {
  productId: number;
  manufacturePlanId: number;
}