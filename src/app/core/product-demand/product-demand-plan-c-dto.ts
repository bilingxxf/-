import { ProductDemandPriority } from '../../constant/product-demand-priority.enum'

export class ProductDemandPlanCDto {
  /**
   * 产品id
   */
  productId: number

  /**
   * 产品的数量
   */
  quantity: number

  /**
   * 需求时间
   */
  demandDate: number

  /**
   * 优先级 1-高;2-中;3-低
   */
  priority: ProductDemandPriority

  type: number;

  name: string;
  content: string;
  serialNo: string;
  date: string;
  current: number;
  //生产线
  productionLine:string;
  // deadline:string;
  // needQuantity:number;
  // productionLineId:number;
}
