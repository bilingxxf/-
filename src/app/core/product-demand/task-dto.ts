import { ProductDemandPriority } from '../../constant/product-demand-priority.enum'

export class TaskDto {
  /**
   * 产品id
   */
  productId: number
  //生产线
  productionLine:string;
  name: string;
  deadline:number;
  needQuantity:number;
  productionLineId:number;
  userId:any
  date: string;
  
}
