import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-inspections-mgmt-page',
  templateUrl: './inspections-mgmt-page.component.html',
})
export class InspectionsMgmtPageComponent implements OnInit {

    projectId: number

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
    }

}
