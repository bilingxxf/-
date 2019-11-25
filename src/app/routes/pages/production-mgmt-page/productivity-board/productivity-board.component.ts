import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
// import { Router } from '@angular/router'
// import { ProductivityService } from '@core/productivity/productivity.service'
// import * as moment from 'moment'
import { Monomer } from '@core/monomer/monomer'
// import { MonomerService } from '@core/monomer/monomer.service'
import { AreaDivision } from '@core/plan/area-division'
// import { Colors } from '../../../../constant/colors.enum';

@Component({
  selector: 'app-productivity-board',
  templateUrl: './productivity-board.component.html',
})
export class ProductivityBoardComponent implements OnInit {
  // active = 1;
    currentArea: any;

    @Input() projectId: number

    @Input() monomer:Monomer

    _areas: AreaDivision[]
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

    monomers: Monomer[] = []

    leftSelectedIndex:number = 0

    leftTabs:any = [
      { name: '结构', value: 'structure', index: 0},
      { name: '围护', value: 'enclosure', index: 1},
      // { name: '辅材', value: 'material', index: 2}
    ]

    constructor(
    ) { }

    async ngOnInit() {
      // this.route.params.subscribe(({ id }) => this.projectId = +id)
    }

    log(args: any[]): void {
      console.log(args);
    }


  // monthSummaryDownload() {
  //   window.open(this.productivityService.getMonthTotalExportUrl(this.monomerId, moment(this.date).format('YYYY-MM')))
  // }

}
