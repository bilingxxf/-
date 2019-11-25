import { Component, OnInit,Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd'
import { SupplieQueryDTO } from '@core/supplie/supplie-query-dto'
import { DetailEnclComponent } from './detail-encl/detail-encl.component';
import { DetailMatComponent } from './detail-mat/detail-mat.component';
import { SupplieService } from '@core/supplie/supplie.service'
import * as moment from 'moment'

@Component({
  selector: 'app-supplie-mgmt-page',
  templateUrl: './supplie-mgmt-page.component.html',
})
export class SupplieMgmtPageComponent implements OnInit {

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {           
      this._currentMonomer = val;
    }
    
    get currentMonomer() {              
      return this._currentMonomer
    }

    @Input() factoryAble: boolean = false

    leftSelectedIndex: number = 0

    leftTabs: any = [
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

    constructor(
    ) { }

    ngOnInit() {

    }

}
