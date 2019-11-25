import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-distribution-summary-list-modal',
  templateUrl: './distribution-summary-list-modal.component.html',
})
export class DistributionSummaryListModalComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
