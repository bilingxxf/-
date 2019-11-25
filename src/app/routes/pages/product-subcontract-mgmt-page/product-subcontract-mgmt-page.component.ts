import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { SimpleTableColumn } from '@delon/abc'
import { ProjectService } from '@core/project/project.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-subcontract-mgmt-page',
  templateUrl: './product-subcontract-mgmt-page.component.html',
})
export class ProductSubcontractMgmtPageComponent implements OnInit {
    data: any[] = []

    columns: SimpleTableColumn[] = [
        {
            title: '项目名称',
            index: 'name'
        },
        {
            title: '创建时间',
            index: 'createTime',
            type: 'date',
            dateFormat: 'YYYY-MM-DD'
        },
        {
            title: '负责人',
            index: 'chargeMan'
        },
        {
            title: '操作',
            buttons: [
                {
                    text: '产品分包',
                    click: (item: any) => this.router.navigate(['/product-subcontract-c', item.id])
                }
            ]
        }
    ]

    constructor(
        private projectService: ProjectService,
        private router: Router
    ) { }

    ngOnInit() {
        this.data = Array(100).fill({}).map((item: any, idx: number) => {
            return {
                id: idx,
                name: `项目${idx + 1}`,
                createTime: moment().subtract(idx, 'd').valueOf(),
                chargeMan: '张三'
            }
        })
    }
}
