import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-enclosure-demand-detail',
  templateUrl: './enclosure-demand-detail.component.html',
})
export class EnclosureDemandDetailComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
