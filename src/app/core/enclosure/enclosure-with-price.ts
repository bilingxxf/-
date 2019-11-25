import { Enclosure } from '@core/enclosure/enclosure'

export class EnclosureWithPrice extends Enclosure {
  /** 成品综合价 */
  finishedProductPrice?: number

  /** 安装综合价 */
  unitFixPrice?: number
}
