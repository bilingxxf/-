import { SecurityLogSituations } from '../../constant/security-log-situations.enum'

export class SecurityLogCDto {
    /**
     * 记录者用户id
     */
    userId: number

    /**
     * 项目的id
     */
    projectId: number

    /**
     * 当天的安全情况
     */
    situation: SecurityLogSituations

    /**
     * 日志内容
     */
    content: string

    /**
     * YYYY-MM-DD
     */
    recordDate: string
}
