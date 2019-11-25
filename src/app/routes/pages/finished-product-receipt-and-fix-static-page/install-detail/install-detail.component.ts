import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-install-detail',
  templateUrl: './install-detail.component.html',
})
export class InstallDetailComponent implements OnInit {

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {
      this._currentMonomer = val;
    }
    get currentMonomer() {
      return this._currentMonomer;
    }

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
        // {
        //     name: '辅材',
        //     value: 'material',
        //     index: 2
        // }
    ]

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
