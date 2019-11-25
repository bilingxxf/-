import { MARGIN_TYPES } from '../../constant/margin-types.enum'
import { Attachment } from '@core/common-entity/attachment'
import { MonomerCreateDto } from '@core/project/monomer-create-dto'
import { STRUCT_TYPES } from '../../constant/struct-types.enum'
export class Project {

    id: string

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
    marginAmount: number

    /**
     * 币种
     */
    currencyType: string

    /**
     * 预付款
     */
    advancePaymentAmount: number

    /**
     * 订单类型 0表示加工订单，1表示承包订单
     */
    orderType: number

    /**
     * 结构类型 0表示厂房，1表示多高层，2表示空间结构
     */
    structType: STRUCT_TYPES

    /**
     * 项目所在地的国家Id
     */
    countryId: string

    /**
     * 所在省Id
     */
    stateId: string

    /**
     * 所在市Id
     */
    cityId: string

    /**
     * 所在区Id
     */
    regionId: string

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

    /**
     * 项目的附件
     */
    attachmentList: Attachment[] = []

    /**
     * 工程的创建时间
     */
    createTime: number

    /**
     * 工程所属的公司id
     */
    companyId: string
    monomers: MonomerCreateDto[] = [new MonomerCreateDto()]
}
