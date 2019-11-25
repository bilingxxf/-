import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'

@Component({
  selector: 'app-project-plan-daily-model',
  templateUrl: './project-plan-daily-model.component.html',
})
export class ProjectPlanDailyModelComponent implements OnInit {

    @Input() date: any[]

    data: any

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
