import { Component, OnInit, Input } from '@angular/core';
import { ProductDemandService } from '../../../../core/product-demand/product-demand.service'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { ProductDemand } from '@core/product-demand/product-demand'
import { TaskPopup } from '../task-popup/task-popup.component'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'
import { TaskService } from '@core/product-demand/task.service'



@Component({
  selector: 'app-task-box-wrap',
  templateUrl: './task-box-wrap.component.html',
})
export class TaskBoxWrap implements OnInit {
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
        private taskService: TaskService,

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
        this.taskService.boxes$.next([])
        this.taskService.tasks = []
        const data = await this.productDemandService.getAllTask(this.monomerId, this.productType)
        this.boxData = data.map((o, i) => {
            const box = o.toBox1(); 
            box.id = o.productId
            box.total = o.totalQuantity;
            // box.current = o.manufacturePlans.map(val => {
            //     return val.demandQuantity
            // }).reduce((pre, cur) => {
            //     return pre + cur
            // }, 0);

           
            box.plans = o.manufacturePlans
            box.click = () => this.openModal([box])
            
            return box
        })
        this.taskService.boxes$.next(this.boxData)
    }

    openModal(box: Box[]) {
        console.log('box---------------------------',box);
        
        if (!box || !box.length) return;
        let history = [];

        const min = box.map(val => {
            const current = Number(val.content.split(' ')[2].split('/')[0]);
            const offset = val.total - current;
            return offset > 0 ? offset : 0;
        }).reduce((pre, cur) => {
            return Math.max(pre, cur)
        }, 0);

        if (box.length === 1) {
            history = box[0].plans
        }
        if (min === 0) {
            this.msg.info('任务已分配');
            return
        }
        this.modal.create({
            nzTitle: `新增任务`,
            nzContent: TaskPopup,
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
