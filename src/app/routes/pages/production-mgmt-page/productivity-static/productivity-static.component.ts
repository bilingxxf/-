import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '@core/monomer/monomer.service'
import { AreaDivision } from '@core/plan/area-division'
import { Colors } from '../../../../constant/colors.enum';


@Component({
  selector: 'app-productivity-static',
  templateUrl: './productivity-static.component.html',
})
export class ProductivityStaticComponent implements OnInit { 

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

    options = [{
        label: '未生产',
        color: Colors.GRAY
    }, {
        label: '部分生产',
        color: Colors.WARN
    }, {
        label: '全部生产',
        color: Colors.SUCCESS
    }]

    selectedIndexOne: number = 0

    selectedIndexTwo: number = 0

    leftTabs: any = [{
            name: '结构',
            value: 'structure',
            index: 0
        }
    ]

    monomers: Monomer[] = []

    constructor(
    ) { }

    async ngOnInit() {
    }

}
