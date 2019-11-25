import { Component, OnInit,Input } from '@angular/core';
import { PlanService } from '@core/plan/plan.service';
import { Colors } from '../../../../constant/colors.enum';

@Component({
  selector: 'app-receive-and-install',
  templateUrl: './receive-and-install.component.html',
})
export class ReceiveAndInstallComponent implements OnInit {

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {
      this._currentMonomer = val;
      // setTimeout(() => {
      //   this.areas = Object.assign([], val.areas)
      // this.currentArea = this.areas[0];
      // }, 1000);
      this.getArea()
    }
    get currentMonomer() {
      return this._currentMonomer;
    }

    areas:any = []

    currentArea:any

    leftSelectedIndex: number = 0

    leftTabs: any = [{
            name: '结构',
            value: 'structure',
            index: 0
        },
        {
            name: '围护',
            value: 'enclosure',
            index: 1
        },
        {
            name: '辅材',
            value: 'material',
            index: 2
        }
    ]

    options = [{
      label: '未安装',
      color: Colors.GRAY
    }, {
      label: '部分安装',
      color: Colors.WARN
    }, {
      label: '全部安装',
      color: Colors.SUCCESS
    }]

    constructor(
      private planService: PlanService
    ) { }

    ngOnInit() {
      this.getArea()
    }

    async getArea() {
      const areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomer.monomer.id)
      this.areas = areas
      this.currentArea = this.areas[0];
    }

}
