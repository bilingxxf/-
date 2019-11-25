import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-payment-remind-c-page',
  templateUrl: './project-payment-remind-c-page.component.html',
})
export class ProjectPaymentRemindCPageComponent implements OnInit {

    dto: any = {}

    constructor(
        private msg: NzMessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    save(dto) {
        console.log(1111)
        this.router.navigate(['../', 'workload'], {
            relativeTo: this.route
        })
    }

}
