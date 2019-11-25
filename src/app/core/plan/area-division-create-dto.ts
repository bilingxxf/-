export class AreaDivisionCreateDto {
    /** 方便页面用而已 */
    id?: number

    /** 区域名字 */
    areaName: string
    tip: string 
    /** 轴线或标高 */
    coordinates: string

    /** 计划材料进场时间 */
    materialApproachTime: string | Date = ''

    constructor(
        public monomerId: number
    ) {  }
}
