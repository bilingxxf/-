import * as moment from 'moment'
import { Component, OnInit } from '@angular/core'
import { MonomerCreateDto } from '@core/project/monomer-create-dto'
import { NzMessageService } from 'ng-zorro-antd'
import { STRUCT_TYPES } from '../../../../constant/struct-types.enum'
import { ORDER_TYPES } from '../../../../constant/order-types.enum'
import { MARGIN_TYPES } from '../../../../constant/margin-types.enum'
import { Router, ActivatedRoute } from '@angular/router'
import { ProjectInfoCDto } from '@core/project/project-info-c-dto'

@Component({
  selector: 'app-project-info-c-page',
  templateUrl: './project-info-c-page.component.html',
})
export class ProjectInfoCPageComponent implements OnInit {

    dto = new ProjectInfoCDto()

    constructor(
        private msg: NzMessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    save(dto: ProjectInfoCDto) {
        this.router.navigate(['../', 'customer'], {
            relativeTo: this.route
        })
    }
}
