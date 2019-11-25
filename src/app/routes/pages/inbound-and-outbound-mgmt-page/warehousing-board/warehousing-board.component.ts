import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from '@core/plan/plan.service'

@Component({
  selector: 'app-warehousing-board',
  templateUrl: './warehousing-board.component.html',
})
export class WarehousingBoardComponent implements OnInit {
    _currentMonomer: any
    @Input() 
    set currentMonomer(val) {
        this._currentMonomer = val;
        this.getArea();
    }
    get currentMonomer() {
        return this._currentMonomer
    }
    currentArea: any

    areas: any[] = []

    leftSelectedIndex:number = 0

    leftTabs:any = [
      { name: '结构', value: 'structure', index: 0},
      { name: '围护', value: 'enclosure', index: 1},
      { name: '辅材', value: 'material', index: 2}
    ]

    constructor(
        private planService: PlanService,
    ) { }

    async getArea() {
        this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomer.id)
        this.currentArea = this.areas[0];
    }

    ngOnInit() {
        // console.log(this.currentMonomer);
    }

}
