import { Component, OnInit, Input, NgZone } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { FixPlanListItem, PlanItem } from '../../../../core/fix-plan/fix-plan-list-item'
import { ProductTypes } from 'app/constant/product-types.enum'
import { FixPlanTypes } from '../../../../constant/fix-plan-types.enum'
import { FixPlanCreateDto } from '../../../../core/fix-plan/fix-plan-create-dto'
import { NzMessageService, NzModalRef } from '../../../../../../node_modules/ng-zorro-antd'
import { FixPlanService } from '../../../../core/fix-plan/fix-plan.service'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { ProductDemandPlanCDto } from '@core/product-demand/product-demand-plan-c-dto'
import { PlanService } from '@core/plan/plan.service'
import { Colors } from 'app/constant/colors.enum'



import * as moment from 'moment'

let that: FixPlanCreateModalComponent

@Component({
  selector: 'app-fix-plan-create-modal',
  templateUrl: './fix-plan-create-modal.component.html',
})
export class FixPlanCreateModalComponent implements OnInit {

    @Input() fixPlan = new FixPlanListItem()

    @Input() productType = ProductTypes.结构

    @Input() fixPlanType: FixPlanTypes = FixPlanTypes.周计划

    @Input() box: Box[] = []

    @Input() max: number = 1;

    @Input() history: PlanItem[] = [];

    demandStartDate: Date = null

    submitting = false

    dto = new FixPlanCreateDto()
    FixPlanTypes = FixPlanTypes;
    constructor(
        public fixPlanService: FixPlanService,
        private msg: NzMessageService,
        private subject: NzModalRef,
        private planService: PlanService,
        private zone: NgZone

    ) { }

    ngOnInit() {
        this.dto.productId = this.fixPlan.productId
        this.dto.type = this.fixPlanType
        that = this
        this.history = this.history.map(val => {
            val.date = moment(val.demandStartDate).format('YYYY-MM-DD');
            return val
        })
    }

    disabledDate(current: Date): boolean {
        const date = new Date(current)
        if (that.fixPlanType === FixPlanTypes.周计划) {
            return date.getDay() !== 0
        } else {
            // const month = date.getMonth();
            // const _date = new Date(current);
            // console.log(_date);
            // _date.setMonth(month + 1);
            // _date.setDate(0);
            // const day = _date.getDate();
            // console.log(day);
            // console.log( date.getDate());
            // return date.getDate() !== day
        }
    }


    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        try {
            this.submitting = true;
            const dtos: ProductDemandPlanCDto[] = this.box.map(val => {
                const dto = new ProductDemandPlanCDto()
                dto.quantity = this.dto.quantity;
                dto.productId = val.id;
                dto.content = val.content;
                dto.name= val.content.split(' ')[0]
                dto.serialNo= val.content.split(' ')[1]
                if (this.fixPlanType === FixPlanTypes.月计划) {
                    const date = new Date(this.fixPlanService.date);
                    const month = date.getMonth();
                    date.setMonth(month -1);
                    date.setDate(0);
                    dto.demandDate = date.getTime();
                    dto.date = moment(dto.demandDate).format('YYYY-MM')
                } else {
                    dto.demandDate = moment(this.fixPlanService.date).valueOf()
                    dto.date = moment(dto.demandDate).format('YYYY-MM-DD')
                }
                val.areas.push({
                    color: Colors.WARN,
                    percent: this.dto.quantity / val.total
                })
                val.length += 1;

                const pre = Number(/\s(\d)/g.exec( val.content)[0])
                val.content = val.content.replace(/\s(\d)/g, ' ' + Number(pre + this.dto.quantity) + '')
                dto.current = Number(pre + this.dto.quantity);
                // val.content = `${this.productName} ${this.serialNo} ${plannedCount}/${this.totalQuantity}`
                dto.type = this.fixPlanType;
                this.planService.addplan(dto);
                return dto
            })
            // await this.fixPlanService.batch(dtos);
            // this.fixPlanService.addplan(d)
            // this.msg.success('添加成功')
           
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }

}
