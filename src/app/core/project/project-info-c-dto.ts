import { MonomerCreateDto } from '@core/project/monomer-create-dto'
import { MARGIN_TYPES } from '../../constant/margin-types.enum'
import { ORDER_TYPES } from '../../constant/order-types.enum'
import { STRUCT_TYPES } from '../../constant/struct-types.enum'

export class ProjectInfoCDto {
    /**
     * 项目所属的公司id
     */
    companyId: number

    /**
     * 项目名称
     */
    name: string

    /**
     * 项目的简称
     */
    shortName: string

    /**
     * 合同编号
     */
    contractNo: string

    /**
     * 签订日期
     */
    signedDate: number

    /**
     * 合同金额
     */
    amount: number

    /**
     * 保证金类型 0表示现金，1表示保函
     */
    marginType: MARGIN_TYPES

    /**
     * 保证金金额
     */
    marginAmount?: number

    /**
     * 币种
     */
    currencyType?: string

    /**
     * 预付款
     */
    advancePaymentAmount?: number

    /**
     * 订单类型 0表示加工订单，1表示承包订单
     */
    orderType: ORDER_TYPES

    /**
     * 结构类型
     */
    structType: STRUCT_TYPES

    /**
     * 项目所在地的国家id
     */
    countryId: number

    /**
     * 所在省id
     */
    stateId: number

    /**
     * 所在市id
     */
    cityId: number

    /**
     * 所在区id
     */
    regionId: number

    /**
     * 详细地址
     */
    address: string

    /**
     * 合同约定开始时间
     */
    startDate: number

    /**
     * 合同约定结束时间
     */
    endDate: number

    /**
     * 业务负责人的名字
     */
    managerName: string

    /**
     * 负责人的手机号
     */
    managerPhone: string

    // 合同吨位量
    contractWeight: number

    /**
     * 项目的附件id集合
     */
    attachments: number[] = []

    /**
     * 项目/工程下的单体集合
     */
    monomers: MonomerCreateDto[] = [new MonomerCreateDto()]
}
