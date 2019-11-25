import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
})
export class LogisticsComponent implements OnInit {

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {
      this._currentMonomer = val;
    }
    get currentMonomer() {
      return this._currentMonomer;
    }

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
