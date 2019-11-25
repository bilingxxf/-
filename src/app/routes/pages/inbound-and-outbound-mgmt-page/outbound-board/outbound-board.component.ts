import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { Box } from '@shared/component/multi-color-box-list/box'
import { MonomerService } from '@core/monomer/monomer.service'
import { WarehousingService } from '@core/warehousing/warehousing.service'
import { Colors } from '../../../../constant/colors.enum'
import { WarehouseOutService } from '../../../../core/warehouse-out/warehouse-out.service'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { PlanService } from '@core/plan/plan.service'


@Component({
  selector: 'app-outbound-board',
  templateUrl: './outbound-board.component.html',
})
export class OutboundBoardComponent implements OnInit {

    _currentMonomer: any
    @Input() 
    set currentMonomer(val) {
        this._currentMonomer = val;
        this.getArea();
    }
    get currentMonomer() {
        return this._currentMonomer
    }

    _currentArea: any

    set currentArea(val) {
        this._currentArea = val;
    }

    get currentArea() {
        return this._currentArea;
    }

    leftSelectedIndex:number = 0

    leftTabs:any = [
        { name: '结构', value: 'structure', index: 0},
        { name: '围护', value: 'enclosure', index: 1},
        { name: '辅材', value: 'material', index: 2}
    ]

    areas: any[] = []

    constructor(
        private monomerService: MonomerService,
        private warehousingService: WarehousingService,
        private planService: PlanService,
    ) { }

    async getArea() {
        this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomer.id)
        this.currentArea = this.areas[0];
    }

   

    async ngOnInit() {
        this.getArea();
    }
}
