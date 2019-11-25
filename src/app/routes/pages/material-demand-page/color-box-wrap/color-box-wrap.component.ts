import { Component, OnInit, Input } from '@angular/core';
import { ProductDemandService } from '../../../../core/product-demand/product-demand.service'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
// import { ProductDemand } from '@core/product-demand/product-demand'
import { MaterialDemandCreateModalComponent } from '../material-demand-create-modal/material-demand-create-modal.component'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { PlanService } from '@core/plan/plan.service'



@Component({
  selector: 'app-color-box-wrap',
  templateUrl: './color-box-wrap.component.html',
})
export class ColorBoxWrapComponent implements OnInit {
    @Input() productType: number  = ProductTypes.结构
    _monomerId: number
    @Input() 
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData()
    }

    get monomerId() {
        return this._monomerId;
    }

    @Input() multi = false
    boxData: Box[]

    constructor(
        private productDemandService: ProductDemandService,
        private modal: NzModalService,
        private msg: NzMessageService,
        private planService: PlanService,

    ) { }

    batch() {
        const data = this.boxData.filter(val => {
            return val.isChecked
        })
        
        this.openModal(data)
    }

    async ngOnInit() {
    }

    async getData() {
        this.planService.boxes$.next([])
        this.planService.plans = []
        const data = await this.productDemandService.getAll(this.monomerId, this.productType)
        this.boxData = data.map((o, i) => {
            const box = o.toBox(); 
            box.id = o.productId
            box.total = o.totalQuantity;
            box.current = o.demandPlans.map(val => {
                return val.demandQuantity
            }).reduce((pre, cur) => {
                return pre + cur
            }, 0);
            box.plans = o.demandPlans
            box.click = () => this.openModal([box])
            return box
        })
        this.planService.boxes$.next(this.boxData)
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
            nzTitle: `新增计划`,
            nzContent: MaterialDemandCreateModalComponent,
            nzComponentParams: { 
                box,
                history: history,
                max: min
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
