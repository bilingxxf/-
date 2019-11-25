export class ContactLetterCDto {
    /**
     * 项目id
     */
    projectId: number

    /**
     * 承包单位
     */
    subcontractor: string

    /**
     * 主送单位
     */
    mainSender: string

    /**
     * 抄送的单位
     */
    subSender: string

    /**
     * 函件的主题
     */
    theme: string

    /**
     * 函件的内容
     */
    content: string

    /**
     * 附件拼接的id字符串
     */
    attachmentIds: number[] = []

    /**
     * 提交函件的用户id
     */
    userId: number
}
