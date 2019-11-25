import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-material-demand-detail',
  templateUrl: './material-demand-detail.component.html',
})
export class MaterialDemandDetailComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
