import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

@Component({
  selector: 'app-project-workload-c-page',
  templateUrl: './project-workload-c-page.component.html',
})
export class ProjectWorkloadCPageComponent implements OnInit {

    dto: any = {}

    constructor(
        private msg: NzMessageService,
        private router: Router,
        private notificationService: NzNotificationService
    ) { }

    ngOnInit() {
    }

    save(dto) {
        this.notificationService.success('创建成功', '')
        this.router.navigate(['/project-detail', 0])
    }

}
