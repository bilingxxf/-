import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {

    transform(value, startDate: Date | number, endDate: Date | number): number {
        if (!startDate || !endDate) return
        return moment(endDate).diff(moment(startDate), 'days') + 1
    }

}
