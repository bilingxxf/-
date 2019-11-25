/**
 * 联系人1会自动设置为管理员
 */
export class EnterpriseCDto {
    name: string

    shortName: string

    /** 联系人1 */
    firstContact: string

    /** 联系人1座机 */
    firstContactTel?: string

    /** 联系人1手机号 */
    firstContactPhone: string

    /** 联系人1邮箱 */
    firstContactEmai: string

    projectLimit: number;

    contactAmountLimit: number;

    modelStorageLimit: number;
    startDate: Date;
    expireDate: Date;
}
