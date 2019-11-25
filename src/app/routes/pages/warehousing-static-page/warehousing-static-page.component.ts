import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-warehousing-static-page',
  templateUrl: './warehousing-static-page.component.html',
})
export class WarehousingStaticPageComponent implements OnInit {

    @Input() projectId: number
    @Input() pageMonomers: any[]

    constructor(
    ) { }

    ngOnInit() {
    }
}
