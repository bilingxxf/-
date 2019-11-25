import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'

@Component({
  selector: 'app-task-assignment-mgmt-page',
  templateUrl: './task-assignment-mgmt-page.component.html',
  styleUrls:['./task-assignment-mgmt-page.component.less']
})
export class TaskAssignmentMgmtPageComponent implements OnInit {
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

    currentArea: any

    active = 1

    data: any[] = []

    dataSet = {}

    lineEmployees: any[] = []

    nzWidthConfig: string[] = []

    allotRecord:any

    leftSelectedIndex: number = 0

    leftTabs: any = [{
            name: '结构',
            value: 'structure',
            index: 0
        }
    ]

    constructor(

    ) {
    }

    ngOnInit(): void {
      
      let timer = null
        timer = setInterval(() => {
            // if(this.areas && this.areas.length > 0){
            //     this.selectedIndex = 2
            //     clearInterval(timer)
            // }
            if(this.areas && this.areas.length > 0){
                setTimeout(() => {
                    this.allotRecord = {
                      areaName: '分配详情',
                      monomerId: -1,
                      type: 0,
                      isDetail:true,
                    }
                    // this.currentArea = this.allotRecord
                }, 1000);
            }
        }, 500);
    }

    
  }