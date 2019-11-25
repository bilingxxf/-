import { PlanType } from '../../constant/plan-type.enum'

export class SinglePlanCreateDto {
    /** 区域划分id 针对详图深化计划和制造计划 */
    areaDivisionId?: number

    /** 任务的名称 */
    name: string

    /** 开始时间 */
    startDate: string | Date = ''

    /** 任务计划完成时间 */
    planedFinishDate: string | Date = ''

    /** 任务的实际完成时间 */
    actualFinishDate?: number

    /** 任务的其他说明信息 */
    tip?: string

    constructor(
        /** 计划的类型 1-原材料采购清单提交计划, 2-详图深化计划, 3-物料采购计划, 4-分包招标计划 */
        public type: PlanType,

        /** 所属的单体id */
        public monomerId: number
    ) { }
}
