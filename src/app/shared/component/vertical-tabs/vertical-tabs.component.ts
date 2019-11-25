import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styles: [`
    .vertical-tabs{
        width: 100%;
        height: 100%;
        display: flex;
    }
  `]
})
export class VerticalTabsComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
