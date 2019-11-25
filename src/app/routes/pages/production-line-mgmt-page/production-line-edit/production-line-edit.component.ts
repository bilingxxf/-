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
  selector: 'app-production-line-edit',
  templateUrl: './production-line-edit.component.html',
  styleUrls:['./production-line-edit.component.less']
})
export class ProductionLineEdit implements OnInit {

     // @Input() User: SystemUser

     submitting = false

     departments: Department[] = []
 
     roles: Role[] = []
 
     @Input() params: SystemUser = new SystemUser()
    
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
        // console.log(this.editItem,'传入的edit信息')
         this.departments = await this.departmentService.getAll()
         //输入框绑定生产线名称
        //  this.dto.name = this.editItem.name
        //  this.roles = await this.roleService.getAll()
        //  this.dto.companyId = await this.userService.getCurrentUserCompanyId()
        const department = this.departments.find(val => {
            return val.name === this.params.departmentName
        })
        if (department) {
            this.params.departmentId = department.id;
        }
     }
 
     cancel() {
        //  this.subject.triggerCancel();
         this.subject.triggerCancel();
     }
 
     async ok() {
         try {
             this.submitting = true
            //  const user: SystemUser = await this.systemUserService.edit(this.dto)
            //  await this.departmentService.addUser(this.dto.departmentId, user.id)
            await this.roleService.editLine(this.params);
             this.msg.success('编辑成功');
             this.subject.triggerOk();
            //  console.log('sub-------------------',this.subject)
         } catch (e) {
             this.submitting = false
         }
     }

}
