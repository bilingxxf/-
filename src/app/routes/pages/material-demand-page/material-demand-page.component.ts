import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { MonomerService } from '@core/monomer/monomer.service'
import { ActivatedRoute } from '@angular/router'
import { NzModalService,NzMessageService } from 'ng-zorro-antd'
import { PlanService } from '@core/plan/plan.service'
import { ProductDemandService } from '../../../core/product-demand/product-demand.service'
import { Box } from '../../../shared/component/multi-color-box-list/box'
import { ProductDemand } from '@core/product-demand/product-demand'
import { MaterialDemandCreateModalComponent } from './material-demand-create-modal/material-demand-create-modal.component'
// import { ProductTypes } from '../../../constant/product-types.enum'


@Component({
  selector: 'app-material-demand-page',
  templateUrl: './material-demand-page.component.html',
})
export class MaterialDemandPageComponent implements OnInit {

    @Input() projectId: number

    _pm: any
    @Input()
    set pm(val) {
        this._pm = val;
        this.currentArea = val.areas[0]
    }
    get pm() {
        return this._pm
    }

    multi = false

    active = 1;

    pageMonomers: PageMonomer[] = []

    currentMonomers = new PageMonomer()

    currentArea: any

    constructor(
        private monomerService: MonomerService,
        private route: ActivatedRoute,
        private modal: NzModalService,
        public planService: PlanService,
        private productDemandService: ProductDemandService,
        private msg: NzMessageService,

    ) { }

    batch() {
        
    }

    visible: boolean = false
    async ngOnInit() {
        this.planService.visible$.subscribe(val => {
            this.visible = val
        })
    }

    close() {
        this.visible = false;
        this.planService.visible$.next(false)
    }

    open() {
        this.visible = true;
        this.planService.visible$.next(true)
    }

    remove(event: Event, index) {
        event.stopPropagation();
        event.preventDefault()
        const plan = this.planService.plans.splice(index, 1)[0];
        const boxes = this.planService.boxes$.getValue();
        const box = boxes.find(val => val.id === plan.productId);
        const pre = Number(/\s(\d)/g.exec(box.content)[0])
        box.content = box.content.replace(/\s(\d)/g, ' ' + Number(pre - plan.quantity) + '')
        box.areas.splice(box.areas.length - box.length , box.length);
        box.length = 0;
    }

    async save() {
        await this.productDemandService.batch(this.planService.plans);
        this.planService.plans = [];
        this.msg.info('添加成功');
    }
    openModal(productDemand: ProductDemand, boxs: Box[], index: number) {
        if (productDemand.isFull()) return
        this.modal.create({
            nzTitle: `新增计划`,
            nzContent: MaterialDemandCreateModalComponent,
            nzComponentParams: { productDemand },
            nzWidth: 600,
            nzMaskClosable: false,
            nzOnOk: async () => {
                Object.assign(boxs[index], productDemand.toBox())
            },
            nzFooter: null
        })
    }

}

class PageMonomer {
    monomer: Monomer

    areas: {
        area: AreaDivision,
        boxs: Box[]
    }[] = []

    enclosureBoxs: Box[]

    supportMaterialBoxs: Box[]
}
