import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { Colors } from '../../../../constant/colors.enum';

@Component({
  selector: 'app-process-board',
  templateUrl: './process-board.component.html',
})
export class ProcessBoardComponent implements OnInit {

  currentArea: any;
  currentArea2: any;
  currentArea3: any;

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

  leftSelectedIndex: number = 0

  contentSelectedIndex: number = 0

  leftTabs: any = [{
        name: '结构',
        value: 'structure',
        index: 0
    },
    {
        name: '围护',
        value: 'enclosure',
        index: 1
    }
  ]

  monomers: Monomer[] = []

  constructor(
  ) { }

  async ngOnInit() {
  }

  selectChange() {
    this.currentArea = this._areas[0];
  }

}
