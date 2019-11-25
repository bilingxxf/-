import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ProjectCustomerCreateDto } from '../../../../core/project/project-customer-create-dto'
import { NzMessageService } from 'ng-zorro-antd'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-customer-c-page',
  templateUrl: './project-customer-c-page.component.html',
})
export class ProjectCustomerCPageComponent implements OnInit {

    dto = new ProjectCustomerCreateDto()

    constructor(
        private msg: NzMessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    save(dto: ProjectCustomerCreateDto) {
        this.router.navigate(['../', 'payment-remind'], {
            relativeTo: this.route
        })
    }
}
