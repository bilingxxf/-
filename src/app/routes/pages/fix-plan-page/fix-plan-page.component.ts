import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { MonomerService } from '@core/monomer/monomer.service'
import { ActivatedRoute } from '@angular/router'
import { NzModalService, NzMessageService} from 'ng-zorro-antd'
import { PlanService } from '@core/plan/plan.service'
import { Box } from '../../../shared/component/multi-color-box-list/box'
// import { FixPlanCreateModalComponent } from './fix-plan-create-modal/fix-plan-create-modal.component'
import { FixPlanService } from '../../../core/fix-plan/fix-plan.service'
// import { ProductTypes } from '../../../constant/product-types.enum'
// import { FixPlanTypes } from '../../../constant/fix-plan-types.enum'
// import { FixPlanListItem } from '@core/fix-plan/fix-plan-list-item'
import { FixPlanQueryDto } from '@core/fix-plan/fix-plan-query-dto';
@Component({
    selector: 'app-fix-plan-page',
    templateUrl: './fix-plan-page.component.html',
  })
  export class FixPlanPageComponent implements OnInit {

    @Input() projectId: number
 
    _pm: any
    @Input()
    set pm(val) {
        this._pm = val;
        this.currentArea = val.areas[0];
    }
    get pm() {
        return this._pm
    }

    active = 1

    pageMonomers: PageMonomer[] = []

    multi = false

    currentMonomers = new PageMonomer()

    dto = new FixPlanQueryDto();

    currentArea: any

    
    constructor(
        private monomerService: MonomerService,
        private route: ActivatedRoute,
        private modal: NzModalService,
        public planService: PlanService,
        private fixPlanService: FixPlanService,
        private msg: NzMessageService,
        ) { }
        
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
        await this.fixPlanService.batch(this.planService.plans);
        this.planService.plans = [];
        this.msg.info('添加成功');
    }

    search() {

    }

}

class PageMonomer {
    monomer: Monomer

    enclosureWeekBoxs: Box[]

    enclosureMonthBoxs: Box[]

    areas: {
        area: AreaDivision,
        weekBoxs: Box[],
        monthBoxs: Box[],
    }[] = []
}
