import { Component, OnInit, Input } from '@angular/core'
import { Colors } from '../../../../constant/colors.enum';

@Component({
  selector: 'app-receipt-panel',
  templateUrl: './receipt-panel.component.html',
})
export class ReceiptPanelComponent implements OnInit {

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {
      this._currentMonomer = val;
      this.currentArea = val.areas[0];
    }
    get currentMonomer() {
      return this._currentMonomer;
    }
    
    active = 1

    currentArea: any

    options = [{
      label: '未收货',
      color: Colors.GRAY
    }, {
      label: '部分收货',
      color: Colors.WARN
    }, {
      label: '全部收货',
      color: Colors.SUCCESS
    }]


    constructor(
    ) { }

    async ngOnInit() {
    }
}
