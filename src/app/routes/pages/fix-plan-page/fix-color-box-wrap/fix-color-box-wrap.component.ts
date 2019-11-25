import { Component, OnInit, Input } from '@angular/core';
import { FixPlanService } from '../../../../core/fix-plan/fix-plan.service'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { FixPlanTypes } from '../../../../constant/fix-plan-types.enum'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
// import { FixPlanListItem } from '@core/fix-plan/fix-plan-list-item'
import { FixPlanCreateModalComponent } from '../fix-plan-create-modal/fix-plan-create-modal.component'
// import { FixPlanQueryDto } from '../../../../core/fix-plan/fix-plan-query-dto';
// import { Colors } from 'app/constant/colors.enum'
import { PlanService } from '@core/plan/plan.service'





@Component({
  selector: 'app-fix-color-box-wrap',
  templateUrl: './fix-color-box-wrap.component.html',
})
export class FixColorBoxWrapComponent implements OnInit {

    @Input() fixPlanTypes = FixPlanTypes.周计划;

    @Input() productType = ProductTypes.结构
    @Input() multi = false;

    _monomerId: number
    @Input()
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData()
    }

    get monomerId() {
        return this._monomerId;
    }
    boxData: any[] = []
    constructor(
        private modal: NzModalService,
        private msg: NzMessageService,
        private fixPlanService: FixPlanService,
        private planService: PlanService,
    ) { }

    async ngOnInit() { 
    }

    async getData() {
        this.planService.boxes$.next([])
        this.planService.plans = []
        const response = await this.fixPlanService.getAll(this.monomerId, this.productType, this.fixPlanTypes);
        this.boxData = response.map((o, i) => {
            const box = o.toBox();
            box.id = o.productId;
            box.total = o.totalQuantity;
            box.current = o.plans.map(val => {
                return val.quantity
            }).reduce((pre, cur) => {
                return pre + cur
            }, 0);
            
            box.plans = o.plans
            box.click = () => this.openModal([box])
            // box.click = () => {

            // }
            return box
        })
        this.planService.boxes$.next(this.boxData)

    }

    batch() {
        const data = this.boxData.filter(val => {
            return val.isChecked
        })
        this.openModal(data)
    }

    openModal(box: Box[]) {
        if (!box.length) return;
        let history = [];

        const min = box.map(val => {
            const offset = val.total - val.current;
            return offset > 0 ? offset : 0;
        }).reduce((pre, cur) => {
            return Math.max(pre, cur)
        }, 0);

        if (box.length === 1) {
            history = box[0].plans
        }
        if (min === 0) {
            this.msg.info('计划已制定');
            return
        }
        this.modal.create({ 
            nzTitle: '新增计划',
            nzContent: FixPlanCreateModalComponent,
            nzComponentParams: {
                box: box,
                history: history,
                max: min,
                fixPlanType: this.fixPlanTypes
            },
            nzWidth: 600,
            nzMaskClosable: false,
            nzOnOk: async () => {
                // this.getData()
            },
            nzFooter: null
        })
    }
}
