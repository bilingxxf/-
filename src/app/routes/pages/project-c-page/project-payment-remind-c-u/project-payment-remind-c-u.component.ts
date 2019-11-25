import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ProjectPaymentRemindCDto } from '../../../../core/project/project-payment-remind-c-dto'
import { MonomerPaymentRemindType } from '../../../../constant/monomer-payment-remind-type.enum'
import * as moment from 'moment'
import { NzMessageService } from 'ng-zorro-antd'
import { ProjectInfoCDto } from '@core/project/project-info-c-dto'
import * as _ from 'lodash'

@Component({
  selector: 'app-project-payment-remind-c-u',
  templateUrl: './project-payment-remind-c-u.component.html',
})
export class ProjectPaymentRemindCUComponent implements OnInit {

    submitting = false

    type: MonomerPaymentRemindType

    types = MonomerPaymentRemindType

    nodeList = new NodeList()

    progressList: Array<{date: string | Date, name: string}> = []

    @Input() btnText = ''

    @Input() dto: ProjectPaymentRemindCDto[] = []

    @Output() onSubmitted = new EventEmitter<any>()

    @Input() projectInfo = new ProjectInfoCDto()

    constructor(
        private msg: NzMessageService
    ) { }

    ngOnInit() {
        if (this.dto && this.dto.length) {
            this.type = this.dto[0].type;
            this.nodeList.data = this.dto.map(val => {
                let node = new NodeList()
                if (val.type === this.types.节点付款) {
                    return {
                        name: val.name,
                        type: val.type,
                        percent: Number(val.presetValue) / this.projectInfo.amount * 100
                    }
                } else {
                    return {
                        name: val.name,
                        type: val.type,
                        date: new Date(val.presetValue)
                    }
                }
            })
        }
    }

    async ok() {
        if (this.type === this.types.节点付款) {
            this.dto = this.nodeList.data.map((o, index) => ({
                name: o.name,
                type: this.type,
                presetValue: o.percent * this.projectInfo.amount / 100 + ''
            }))
        } else {
            this.dto = this.progressList.map((o, index) => ({
                name: o.name,
                type: this.type,
                presetValue: moment(o.date).format('YYYY-MM-DD')
            }))
        }
        this.onSubmitted.emit(this.dto)
    }

    canSubmit() {
        if (this.type === this.types.进度付款) {
            return this.progressList.every(o => !!o.date && !!o.name)
        }
        if (this.type === this.types.节点付款) {
            return this.nodeList.data.every(o => !!o.percent && !!o.name) &&
                this.nodeList.getTotalPercent() === 1
        }
        return false
    }
}

class NodeList {
    data: {percent?: number, name: string}[] = []

    getTotalPercent(): number {
        return _.sum(this.data.map(o => o.percent).filter(Boolean)) / 100
    }
}
