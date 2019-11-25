import * as _ from 'lodash'
import { Injectable } from '@angular/core'
import { LabelValue } from '../common-entity/label-value'
import { NzModalService } from 'ng-zorro-antd'
import { SelectKvModalComponent } from '../../modals/select-kv-modal/select-kv-modal.component'
import * as moment from 'moment'

@Injectable()
export class UtilService {
    constructor(
        private modal: NzModalService
    ) { }

    /**
     * 改变数组项顺序
     *
     * @param arr
     * @param oldIndex
     * @param newIndex
     */
    arrayMove(arr: any[], oldIndex: number, newIndex: number): void {
        if (newIndex >= arr.length) {
            let k = newIndex - arr.length + 1
            while (k--) {
                arr.push(undefined)
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    }

    /**
     * 将对象转为查询字符串
     *
     * @param obj
     */
    objToSearch(obj: Object) {
        return Object.keys(obj)
            .filter(key => {
                const value = obj[key]
                return value !== null  && value !== undefined 
            })
            .map(key => {
                const value = obj[key]
                return `${key}=${_.isArray(value) ? value.join() : value}`
            })
            .join('&')
    }

    toLabelValue<T>(arr: any[], prop: {labelProp: string, valueProp: string}): LabelValue<T>[] {
        return arr.map(o => ({
            label: o[prop.labelProp],
            value: o[prop.valueProp]
        }))
    }

    /**
     * 遍历枚举类型的value
     *
     * @param e 枚举类型
     */
    iterateEnum = iterateEnum

    openSelectKvModal<T>(title: string, kvs: {k: string, v: T}[]): Promise<T> {
        return new Promise(resolve => {
            // const s = this.modal.create({
            //     nzTitle: title,
            //     nzContent: SelectKvModalComponent,
            //     nzComponentParams: { kvs },
            //     nzWidth: 600,
            //     nzMaskClosable: false,
            //     nzFooter: null
            // })

            // s.subscribe(v => {
            //     const events = [
            //         'onShown',
            //         'onHide',
            //         'onOk',
            //         'onHidden',
            //         'onDestroy',
            //         'onCancel',
            //     ]
            //     if (!events.includes(v)) resolve(v)
            // })
        })
    }

    /**
     * 获取近10年
     */
    getRecentYears(): number[] {
        const currentYear = moment().get('year')
        return Array(10).fill(0).map((y, i) => currentYear - i)
    }

    /**
     * 获取1-12
     */
    getMonthOfYear(): number[] {
        return _.range(1, 12 + 1)
    }

    /**
     * 获取天数
     */
    getMonthDay(yearMonth: string): string[] {
        const count = this.getCountDays(yearMonth);
        const days = _.range(1, count + 1);
        return days.map(val => {
            if (val < 10) {
                return  `${yearMonth}-0${val}`
            } else {
                return `${yearMonth}-${val}`
            }
        })
    }

    /**
     * 获取月
     */
    getMonths(year: number|string):string[] {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(val => {
            return `${year}-${val}`
        });
    }

    /**
     * 获取一个月有几天
     */
    getCountDays(yearMonth: string):number {
        const date = new Date(yearMonth),
              month = date.getMonth();
        // console.log(month);
        date.setMonth(month + 1);
        date.setDate(0);
        return date.getDate();
    }

    setClassFiled(classObj, newObj) {
        // 判断classObj和newObj是否是对象
        if(Object.prototype.toString.call(classObj) === '[Object Object]' && Object.prototype.toString.call(newObj) === '[Object Object]') {
            return 
        }
        for(let i in newObj) {
            classObj[i] = newObj[i]
        }
    }
}

export function iterateEnum(e: Object): number[] {
    const keys = Object.keys(e)
    return keys.slice(keys.length / 2).map(k => e[k])
}
