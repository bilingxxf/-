import { Component, OnInit, Input } from '@angular/core';
import { Colors } from '../../../../constant/colors.enum';

@Component({
  selector: 'app-fix-panel',
  templateUrl: './fix-panel.component.html',
})
export class FixPanelComponent implements OnInit {
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

    currentArea: any

    constructor(
    ) { }

    ngOnInit() {
    }

}
