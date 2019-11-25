import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
// import { SimpleTableColumn } from '@delon/abc'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-project-detail-page',
    templateUrl: './project-detail-page.component.html',
})
export class ProjectDetailPageComponent implements OnInit {

    projectId: number

    constructor(
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = +id)
    }
}
