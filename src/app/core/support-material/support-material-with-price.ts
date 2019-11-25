import { SupportMaterial } from '@core/support-material/support-material'

export class SupportMaterialWithPrice extends SupportMaterial {
  /** 成品综合价 */
  finishedProductPrice?: number

  /** 安装综合价 */
  unitFixPrice?: number
}
