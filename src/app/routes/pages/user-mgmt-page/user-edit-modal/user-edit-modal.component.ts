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
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
})
export class UserEditModalComponent implements OnInit {

     // @Input() User: SystemUser

     submitting = false

     departments: Department[] = []
 
     roles: Role[] = []
 
     @Input() dto: SystemUser = new SystemUser()
    
     @Input() editItem:any


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
        const department = this.departments.find(val => {
            return val.name === this.dto.departmentName
        })
        if (department) {
            this.dto.departmentId = department.id;
        }
     }
 
     cancel() {
         this.subject.triggerCancel();
     }
 
     async ok() {
         try {
             this.submitting = true
             const user: SystemUser = await this.systemUserService.edit(this.dto)
            //  await this.departmentService.addUser(this.dto.departmentId, user.id)
             this.msg.success('编辑成功');
             this.subject.triggerOk();;
         } catch (e) {
             this.submitting = false
             this.msg.error(e.error.message)
         }
     }

}
