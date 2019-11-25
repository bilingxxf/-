import { Component, OnInit, Input } from '@angular/core'
import { MonomerService } from '@core/monomer/monomer.service'
import { Monomer } from '@core/monomer/monomer'
import { PlanService } from '@core/plan/plan.service'


@Component({
  selector: 'app-quality-board-page',
  templateUrl: './quality-board-page.component.html',
})
export class QualityBoardPageComponent implements OnInit {

    @Input() projectId: number
    @Input() type: string = 'table'

    _pm: any
    @Input()
    set pm(val) {
        this._pm = val
        this.currentArea = val.areas[0]
        if (val && val.length) {
        }
    }
    get pm() {
        return this._pm
    }

    @Input()
    processType: number = 1


    active = 1;

    monomers: Monomer[] = []
    pageMonomers: any[] = []
    currentArea: any

    leftSelectedIndex: number = 0

    leftTabs: any = [{
        name: '结构',
        value: 'structure',
        index: 0
    }, {
        name: '围护',
        value: 'enclosure',
        index: 1
    }]
    leftTabsBoard: any = [{
        name: '结构',
        value: 'structure',
        index: 0
    },
    //  {
    //     name: '围护',
    //     value: 'enclosure',
    //     index: 1
    // }
    ]
    constructor(
        private monomerService: MonomerService,
        private planService: PlanService,

    ) { }

    async ngOnInit() {
    }
}
 