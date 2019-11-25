import { ProductComponent } from './product-component'

export class ProductComponentWithPrice extends ProductComponent {
  /** 成品综合价 */
  finishedProductPrice?: number

  /** 安装综合价 */
  unitFixPrice?: number
}
