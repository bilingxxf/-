import { Component, OnInit, ViewChild } from '@angular/core'
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc'
import swal, { SweetAlertType } from 'sweetalert2'
import { Paginate } from '../../../core/common-entity/paginate'
import { UserService } from '@core/user/user.service'
import { DepartmentService } from '../../../core/department/department.service'
import { NzMessageService } from 'ng-zorro-antd'
import { DepartmentQueryDto } from '@core/department/department-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { Department } from '../../../core/department/department'
import { DepartmentTreeDto } from '@core/department/department-tree';

class TreeNode {
    name: string;
    id: number;
    children: TreeNode[];
    hasChildren: boolean
    constructor(name: string, id: number, children: TreeNode[] = [], hasChildren: boolean) {
        this.name = name;
        this.id = id;
        this.children = children;
        this.hasChildren = hasChildren;
    }
}

@Component({
  selector: 'app-department-mgmt-page',
  templateUrl: './department-mgmt-page.component.html',
})
export class DepartmentMgmtPageComponent implements OnInit {
    show = false
    showEdit = false
    showDelete = false

    data = new PagingData<Department>()

    departments: Department[] = []

    dto = new DepartmentQueryDto()

    nodes = []

    options = {
        getChildren: (node:TreeNode) => {
            // console.log(node);
            // return request('/api/children/' + node.id);
        },
        isExpandedField: 'expanded',

    }

    constructor(
        public userService: UserService,
        private departmentService: DepartmentService, 
        private message: NzMessageService
    ) { }

    async ngOnInit() {
        this.dto.companyId = await this.userService.getCurrentUserCompanyId()
        this.departments = await this.departmentService.getAll()
        this.getTree();
        // this.getData()
    }

    async edit(node) {
        const { value: name } = await swal({
            title: '修改部门名称',
            input: 'text',
            showCancelButton: true
        })
        if (!name) return
        try {
            node.name = name;
            await this.departmentService.edit(node);
            this.message.success(`部门: "${name}"修改成功`);
            this.getTree();
        } catch (e) {
            this.message.error(e.error.message)
        }

    }

    async remove(node) {
        try {
            node.name = name;
            await this.departmentService.remove(node);
            this.message.success(`部门: "${name}"删除成功`);
            this.getTree();
        } catch (e) {
            this.message.error(e.error.message)
        }
    }

    async c(node) {
        const { value: name } = await swal({
            title: '请输入部门',
            input: 'text',
            showCancelButton: true
        })

        if (!name) return
        try {
            const query = new DepartmentTreeDto()
            query.name = name;
            query.parentDepartmentId = node.id;
            query.companyId = this.dto.companyId;
            await this.departmentService.c(query)
            this.message.success(`部门: "${name}"创建成功`)
            this.getTree()
            // this.departments = await this.departmentService.getAll()
        } catch (e) {
            this.message.error(e.error.message)
        }
    }

    async getData() {
        this.data = await this.departmentService.list(this.dto)
    }

    async getChildren($event) {
        const nodeElement = $event.node.data;
    }

    async getTree() {
        const response = await this.departmentService.getDepartmentTrees(this.dto.companyId);
        this.nodes = [response]
    }

    resetPageAndGetData() {
        setTimeout(() => {
            this.data.pageNo = 1
            this.getData()
        }, 0)
    }

    reset() {
        this.dto.page = 1
        this.dto.size = 10
        this.resetPageAndGetData()
    }
}
