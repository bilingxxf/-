import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'app-project-actions',
    templateUrl: './project-actions.component.html',
})
export class ProjectActionsComponent implements OnInit {

    private _projectId: number

    actions: Menu[] = []

    @Input() name = '操作'

    /**
     * 选择菜单的范围
     *
     * 两位就为中间
     * 一位就为到底
     */
    @Input() range: number[] = [0]

    @Input() set projectId(id: number) {
        this._projectId = id
        this.actions = [
            new Menu(['/project-detail', id], '详情'),
            new Menu(['/implement-plan-create', id], '制定实施计划'),
            new Menu(['/implement-plan-detail', id], '查看实施计划'),
            new Menu(['/inventory-import', id], '清单导入'),
            new Menu(['/business-entry', id], '商务录入'),
            new Menu(['/product-subcontract-c', id], '产品分包'),
            new Menu(['/production-mgmt', id], '生产管理'),
            new Menu(['/quality-mgmt', id], '品质管理'),
            new Menu(['/inbound-and-outbound-mgmt', id], '出入库管理'),
            new Menu(['/total-progress', id], '总进度看板'),
            new Menu(['/finished-product-receipt-and-fix-static', id], '收安统计'),
            new Menu(['/project-plan', id], '项目计划'),
            new Menu(['/inspections-mgmt', id], '巡检管理'),
            // new Menu(['/inspection-mgmt', id], '巡检报告'),
            new Menu(['/construction-material', id], '施工资料管理'),
            new Menu(['/receipt-and-invoice-mgmt', id], '收款及开票管理'),
        ].slice(...this.range)
    }

    constructor(
    ) { }

    ngOnInit() {
    }

}

class Menu {
    constructor(
        public routes: [string, number],

        public name: string
    ) {
        this.routes = routes
        this.name = name
    }
}
