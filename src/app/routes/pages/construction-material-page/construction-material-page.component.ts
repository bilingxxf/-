import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-construction-material-page',
  templateUrl: './construction-material-page.component.html',
})
export class ConstructionMaterialPageComponent implements OnInit {

    projectId: number

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = +id)
    }
}
