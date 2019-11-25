import { SecurityLogSituations } from '../../constant/security-log-situations.enum'
export class SecurityLogListItem {
  id: number

  /** 情况 */
  situation: SecurityLogSituations

  /** YYYY-MM-DD */
  recordDate: string
}
