import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import * as moment from 'moment'
import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { SFSchema } from 'nz-schema-form'
import { _HttpClient } from '@delon/theme'
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc'
import { MonomerService } from '@core/monomer/monomer.service'
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../constant/variable.constant'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../core/role/role.service'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-approval-history',
  templateUrl: './approval-history.component.html',
})
export class ApprovalHistoryComponent implements OnInit {
    @Input() companyId: number
    data: any[] = [] 
    list: any[]
    userList: any
    typeList: any
    isVisible: boolean = false;
    editVisible: boolean = false
    addMemberForm: any = {}
    editForm: any = {}
    validateForm: FormGroup;
    validateForm1: FormGroup
    constructor(
        private monomerService: MonomerService,
        private fb: FormBuilder,
        private roleService: RoleService,
        private message: NzMessageService

    ) {}

    async ngOnInit() {
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
        this.roleService.lineProductUser(this.companyId).then(res => {
            this.userList = res.data
        })
       
        this.typeList = [{ name: '过磅超标', type: 1 }]
        
        this.validateForm = this.fb.group({
            userId: [ '', [ Validators.required ] ],
            type: [ '', [ Validators.required ] ]
        });
        this.validateForm1 = this.fb.group({
            uId: [ '', [ Validators.required ] ],
        });
        this.getDate()
    }
    async getDate() {
        this.addMemberForm = {
            userId: null,
            type: null,
        }
        this.editForm = { uId: null, id: null }

        this.list = await this.monomerService.contactList(this.companyId)
      }
    handleOk() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            this.validateForm.controls[ i ].updateValueAndValidity();
        }  
        if( this.validateForm.controls.userId.value && this.validateForm.controls.type.value) {
            this.roleService.addContact(this.addMemberForm.userId, this.companyId, this.addMemberForm.type).then(res => {
              if(res) {
                 this.message.success("新增用户成功");
                 this.isVisible = false
                 this.validateForm.reset();
                 this.getDate()
               }
             }).catch(err => {
                this.isVisible = false
             })
          }
    }
    editHandle(item) {
        this.editVisible = true
        this.editForm = item
        const type = this.userList.find(val => {
            return val.id === this.editForm.userId
        })
        this.editForm.uId = type.id
    }
    editHandleOk() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            this.validateForm.controls[ i ].updateValueAndValidity();
        }  
        this.roleService.editContact(this.editForm.uId, this.editForm.id).then(res => {
            if(res) {
                this.message.success("修改成功");
                this.editVisible = false
                this.validateForm1.reset();
                this.getDate()
            }
            }).catch(err => {
            this.editVisible = false
            })
    }

    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }

    handleCancel() {
        this.isVisible = false;
        this.editVisible = false;
        this.validateForm.reset();
    }
  
}
