import * as moment from 'moment'
import { Component, OnInit, Input } from '@angular/core'
import { ProductDemand, PlanItem } from '@core/product-demand/product-demand'
import { ProductDemandPlanCDto } from '@core/product-demand/product-demand-plan-c-dto'
import { ProductDemandService } from '../../../../core/product-demand/product-demand.service'
import { NzMessageService, NzModalRef } from 'ng-zorro-antd'
import { ProductDemandPriority } from '../../../../constant/product-demand-priority.enum'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { Colors } from 'app/constant/colors.enum'
import { PlanService } from '@core/plan/plan.service'




@Component({
  selector: 'app-material-demand-create-modal',
  templateUrl: './material-demand-create-modal.component.html',
})
export class MaterialDemandCreateModalComponent implements OnInit {

    @Input() productDemand = new ProductDemand()

    @Input() box: Box[] = []

    @Input() max: number = 1;

    @Input() history: PlanItem[] = [];

    productDemandPriority = ProductDemandPriority

    submitting = false

    dto = new ProductDemandPlanCDto()

    constructor( 
        public productDemandService: ProductDemandService,
        private msg: NzMessageService,
        private subject: NzModalRef,
        private planService: PlanService,

    ) { }
 
    ngOnInit() {
        this.history = this.history.map(val => {
            val.date = moment(val.demandDate).format('YYYY-MM-DD');
            return val
        })
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        this.submitting = true;
        const dtos: ProductDemandPlanCDto[] = this.box.map(val => {
            const dto = new ProductDemandPlanCDto();
            dto.quantity = this.dto.quantity;
            dto.productId = val.id;
            dto.demandDate = moment(this.productDemandService.date).valueOf();
            dto.content = val.content;
            dto.name= val.content.split(' ')[0]
            dto.serialNo= val.content.split(' ')[1]
            dto.date = moment(dto.demandDate).format('YYYY-MM-DD')
            val.areas.push({
                color: Colors.WARN,
                percent: this.dto.quantity / val.total
            })
            val.length += 1;
            const pre = Number(/\s(\d)/g.exec( val.content)[0])
            val.content = val.content.replace(/\s(\d)/g, ' ' + Number(pre + this.dto.quantity) + '')
            dto.current = Number(pre + this.dto.quantity);
            this.planService.addplan(dto);
            return dto
        })
        // this.planService.boxes$.next(this)
        try {
            // await this.productDemandService.batch(dtos);

            // this.msg.success('添加成功');
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false;

        }
        this.submitting = false;
    }

}
