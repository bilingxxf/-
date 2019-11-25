import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-fix-plan-detail-modal',
  templateUrl: './fix-plan-detail-modal.component.html',
})
export class FixPlanDetailModalComponent implements OnInit {
    @Input() date: any[]

    data: any

    constructor(
    ) { }

    ngOnInit() {
    }

}
