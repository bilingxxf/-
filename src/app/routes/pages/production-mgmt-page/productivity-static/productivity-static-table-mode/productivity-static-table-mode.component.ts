import { Component, OnInit, Input } from '@angular/core'
import { AreaDivision } from '@core/plan/area-division'
import { Monomer } from '@core/monomer/monomer'


@Component({
  selector: 'app-productivity-static-table-mode',
  templateUrl: './productivity-static-table-mode.component.html',
})
export class ProductivityStaticTableModeComponent implements OnInit {

  
    @Input() monomerId: number

    _areas: any[]
    @Input() 
    set areas(val) {
      if(val) {
          this._areas = val;
          this.currentArea = this._areas[0];
      } else {
          this._areas = []
          this.currentArea = null
      }
    }
    get areas() {
      return this._areas;
    }

    leftSelectedIndex:number = 0

    currentArea: any

    leftTabs:any = [
      { name: '结构', value: 'structure', index: 0},
      { name: '围护', value: 'enclosure', index: 1}
  ]

    constructor(
    ) { }

    ngOnInit() {
    }

}

class PageMonomer {
  monomer: Monomer

  areas: AreaDivision[] = []
}

