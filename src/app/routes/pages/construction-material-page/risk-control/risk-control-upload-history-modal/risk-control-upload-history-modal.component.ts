import { Component, OnInit, Input } from '@angular/core'
import { RiskControlItem } from '@core/risk-control/risk-control-list'

@Component({
  selector: 'app-risk-control-upload-history-modal',
  templateUrl: './risk-control-upload-history-modal.component.html',
})
export class RiskControlUploadHistoryModalComponent implements OnInit {

    @Input() item = new RiskControlItem()

    constructor(
    ) { }

    ngOnInit() {
    }

}
