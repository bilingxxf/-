import { ProjectManager } from './project-manager'
export class ProjectCustomerInfo {

    id: number

    /** 所属的项目id */
    projectId: number

    /** 建设单位 */
    buildCompany: string

    /** 建设单位负责人 */
    buildCompanyManager: string

    /** 建设单位负责人邮箱 */
    buildCompanyEmail: string

    /** 实际发包人 */
    actualSender: string

    /** 实际发包负责人 */
    senderManager: string

    /** 实际发包人邮箱 */
    senderEmail: string

    /** 实际发包人办公地址 */
    senderOfficeAddress: string

    /** 开户行 */
    bankName: string

    /** 开户账号 */
    bankAccount: string

    /** 社会统一代码 */
    socialCode: string

    /** 其他补充说明 */
    tips: string

    /** 创建时间 */
    createTime: number

    bankCode: string;

    managers: ProjectManager[] = []
}
