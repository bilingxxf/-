import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ProductDemandPlanListItem } from '@core/product-demand/product-demand-plan-list-item'
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-plan-list-modal',
  templateUrl: './plan-list-modal.component.html',
})
export class PlanListModalComponent implements OnInit {

    @Input() data: ProductDemandPlanListItem[] = []

    constructor(
        private subject: NzModalRef
    ) { }

    ngOnInit() {
    }

}
