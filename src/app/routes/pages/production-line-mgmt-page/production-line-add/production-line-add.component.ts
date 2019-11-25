import { Component, OnInit, Input } from '@angular/core'
import { UserService } from '../../../../core/user/user.service'
import { DepartmentService } from '../../../../core/department/department.service'
import { RoleService } from '../../../../core/role/role.service'
import { SystemUserCDto } from '@core/system-user/system-user-c-dto'
import { Department } from '../../../../core/department/department'
import { Role } from '@core/role/role'
import { NzModalRef, NzMessageService } from 'ng-zorro-antd'
import { SystemUserService } from '@core/system-user/system-user.service'
import { SystemUser } from '@core/system-user/system-user'

@Component({
  selector: 'app-production-line-add',
  templateUrl: './production-line-add.component.html',
})
export class ProductionLineAdd implements OnInit {

    submitting = false

    departments: Department[] = []

    roles: Role[] = []
    isShowPwd = false;

    @Input() dto: SystemUserCDto = new SystemUserCDto()

    constructor(
        private userService: UserService,
        private systemUserService: SystemUserService,
        private msg: NzMessageService,
        private departmentService: DepartmentService,
        private roleService: RoleService,
        private subject: NzModalRef,
    ) { }

    async ngOnInit() {
        this.departments = await this.departmentService.getAll()
        this.roles = await this.roleService.getAll()
        this.dto.companyId = await this.userService.getCurrentUserCompanyId()
    }

    cancel() {
        this.subject.triggerCancel();
    }

    showPwd() {
        this.isShowPwd = !this.isShowPwd;
    }

    async ok() {
        console.log('add')
        this.submitting = true
        this.msg.success('添加成功')
        this.subject.triggerOk();
    //     try {
    //         this.submitting = true
    //         const user: SystemUser = await this.systemUserService.c(this.dto)
    //         await this.departmentService.addUser(this.dto.departmentId, user.id)
    //         this.msg.success('添加成功')
    //         this.subject.triggerOk();
    //     } catch (e) {
    //         this.submitting = false
    //         this.msg.error(e.error.message)
    //     }
    }

}