import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { ProductTypes } from '../../../constant/product-types.enum'
import { PlanService } from '@core/plan/plan.service'
import { UtilService } from '@core/util/util.service'





@Component({
  selector: 'app-warehousing-mgmt-page',
  templateUrl: './warehousing-mgmt-page.component.html',
  styles: [
    `.item {
      margin: 0 4px;
      padding: 4px 8px;
      height: 116px;
      border-top: 2px solid #e9e9e9;
    }

    .item-disabled {
      color: rgba(0, 0, 0, .25);
    }

    .item-wrote {
      border-top-color: #00CC83;
      cursor: pointer;
    }

    .item-unwrote {
      cursor: pointer;

      :hover {
        background-color: #EEF7FD;
      }
    }`
    ]
})
export class WarehousingMgmtPageComponent implements OnInit {

    @Input() projectId: number          //

    @Input() pageMonomers: any[]        //

    _currentMonomer: any                //

    @Input()
    set currentMonomer(val) {           //
      this._currentMonomer = val;
      this.getArea();
    }
    get currentMonomer() {              //
      return this._currentMonomer
    }

    @Input() warehouseType: number = 0;   //

    active = 1

    productTypes = ProductTypes;
    date = new Date()
    currentArea: any;
    areas: any[] = []


    weeks = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
    ]

    monomers: Monomer[] = [];

    constructor(
      private planService: PlanService,
      private utilService: UtilService,
    ) { }

    async getArea() {
      this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomer.id)  //
      this.currentArea = this.areas[0];

    }
    async ngOnInit() {
    }
}
