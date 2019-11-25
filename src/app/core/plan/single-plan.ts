import { PlanType } from '../../constant/plan-type.enum'
import { AreaDivision } from './area-division'

export class SinglePlan {

    areaDivision?: AreaDivision

    areaDivisionId?: number

    /** 任务的名称 */
    name: string

    /** 开始时间 */
    startDate: number

    /** 任务计划完成时间 */
    planedFinishDate: number

    /** 任务的实际完成时间 */
    actualFinishDate?: number

    /** 任务的其他说明信息 */
    tip?: string

    type: PlanType

    /** 所属的单体id */
    monomerId: number

    createTime: number
}
