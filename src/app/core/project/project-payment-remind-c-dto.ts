import { MonomerPaymentRemindType } from '../../constant/monomer-payment-remind-type.enum'

export class ProjectPaymentRemindCDto {

    type: MonomerPaymentRemindType

    /**
     * 节点名称
     *
     * 用于节点付款
     * 自动生成 节点1 节点2...
     */
    name: string

    /**
	 * 预设工作量（万元）/预设时间节点
     * 用字符串
	 */
    presetValue: string


    projectId?: number
}
