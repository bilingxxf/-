import { Paginate } from '@core/common-entity/paginate'

export class PackingListDTO extends Paginate {
    /** 单体id */
    monomerId: string

    /** 月份 */
    month: string
}