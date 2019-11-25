import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-finished-board',
  templateUrl: './finished-board.component.html',
})
export class FinishedBoardComponent implements OnInit {
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


    constructor(
    ) { }

    ngOnInit() {
    }

}
