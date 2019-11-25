import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-structural-demand-detail',
  templateUrl: './structural-demand-detail.component.html',
})
export class StructuralDemandDetailComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
