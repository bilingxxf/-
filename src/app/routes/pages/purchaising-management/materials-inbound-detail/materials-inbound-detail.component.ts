import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-materials-inbound-detail',
  templateUrl: './materials-inbound-detail.component.html',
})
export class MaterialsInboundDetailComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
