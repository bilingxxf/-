import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
import { SystemUserService } from '../../../../core/system-user/system-user.service'
import { PagingData } from '@core/common-entity/paging-data'
import { SystemUser } from '@core/system-user/system-user'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { ProductionLineEdit } from '../production-line-edit/production-line-edit.component'
// import { ProductionLineAdd } from './production-line-add/production-line-add.component'
import { Role } from '../../../../core/role/role'
import { RoleService } from '../../../../core/role/role.service'
import { UserService } from '@core/user/user.service'
import swal_line, { SweetAlertType } from 'sweetalert2'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'

@Component({
  selector: 'app-production-line-page',
  templateUrl: './production-line-page.component.html',
})
export class ProductionLineMgmtComponent implements OnInit {
    @Input() proStatus: number
    isVisible: boolean = false;
    addMemberForm: any = {}
    styleList: any = []
    userList: any = []
    companyId: number
    validateForm: FormGroup;
    constructor(
        private systemUserService: SystemUserService,
        private message: NzMessageService,
        private modal: NzModalService,
        private roleService: RoleService,
        private msg: NzMessageService,
        public userService: UserService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    dto = new ListQueryWithCompanyId()

    data = new PagingData<Role>()
    // data = new PagingData<Role>()

    async ngOnInit() {
        this.dto.productionLineType = 0
        this.addMemberForm = {
            userId: null,
            productionLineId: null,
            type: null
        }
        this.styleList = [{
            name: '总装',
            id: 0
        }, {
            name: '总装检验',
            id: 1
        }, {
            name: '涂装',
            id: 2
        }, {
            name: '涂装检验',
            id: 3
        }]
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
        this.validateForm = this.fb.group({
            userId: [ null, [ Validators.required ] ],
            type: [ null, [ Validators.required ] ]
          });
        if (!await this.userService.currentUserIsAdmin()) {
            this.dto.companyId = (await this.userService.getUser()).companyId
        }
        this.roleService.lineProductNewUser().then(res => {
            this.userList = res
        })
        this.getData()
        // this.getList()
    }

    //根据id查询生产线列表
    // async getList(){
    //     console.log('lll')
    //     this.data = await this.roleService.searchLineId(this.dto)
    //     console.log(this.dto.id,'enenen')
    //     console.log(this.data,'ididid')
    // }

    search(id: number) {
        console.log('kk')
        this.dto.id = id;
        this.dto.page = 1;
        // this.getList()
    }

    
    //根据companyId查询生产线列表
    async getData() {
        // this.data = await this.systemUserService.productionLine(this.dto)
        this.dto.productionLineType = 0
        this.data = await this.roleService.productionLine(this.dto)
    }

    

    //跳转到详情页
    async navigateTo(id:number){
        console.log(id)
        this.dto.id = id 
        this.router.navigate(['product-line-detail'], {
            queryParams: {
                lineId: id
              }
        })
        // this.data = await this.roleService.searchLineId(this.dto)
        // console.log(this.data,'跳转到详情页')
    }
    addUser(item) {
        this.isVisible = true
        this.addMemberForm.productLineId = item.id
    }
    handleOk() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            this.validateForm.controls[ i ].updateValueAndValidity();
        }  
        if(this.validateForm.controls.type.value && this.validateForm.controls.userId.value) {
            this.roleService.addRoleProduct(this.addMemberForm.userId, this.addMemberForm.productLineId, this.addMemberForm.type).then(res => {
                if(res) {
                   this.message.success("新增成功");
                   this.isVisible = false
                   this.validateForm.reset();
                   this.getData()
                 }
               })
        }
    }
    handleCancel() {
        this.isVisible = false;
        this.validateForm.reset();
    }
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }
    async disable(user: SystemUser) {
        try {
            await this.systemUserService.disableUser(user.id);
            user.isEnabled = !user.isEnabled;
            this.message.success('操作成功');
        } catch (e) {

        }
    }
    //删除生产线
    async remove(row: Role) {
        try {
            await this.roleService.remove_line(row);
            this.msg.success('操作成功');
            this.getData()
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

  //添加生产线
    async c(row?: Role) {
        const { value: name } = await swal_line({
            title: '请输入生产线名称',
            input: 'text',
            showCancelButton: true,
            // value: row ? row.name : ''
        })

        if (!name) return
        try {
            if (row && row.id) {
                // console.log('qqq')
                // console.log(row,'row',row.id,'row.id',)
                // await this.roleService.editLine({
                //     ...row,
                //     name: name
                // });
                // this.msg.success(`生产线: "${name}"编辑成功`)
                // this.getData()
            } else {
                console.log('ssss')
                await this.roleService.addLine(name, 0)
                this.msg.success(`生产线: "${name}"创建成功`)
                this.getData()
            }
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    //编辑生产线
    async edit(row:Role) {
        this.modal.create({
            nzTitle: '编辑生产线',
            nzContent: ProductionLineEdit,
            nzComponentParams: {
                params: JSON.parse(JSON.stringify(row))
            },
            nzWidth: 600,
            nzMaskClosable: false,
            nzOnOk: () => {
                this.getData()
            },
            nzFooter: null
        })
    }

    // go(date) {
    //     this.router.navigate(['/product-board-detail', this.projectId], {
    //       queryParams: {
    //           date: date,
    //           monomerId: this.monomerId,
    //           productType: this.productType
    //       }
    //   })
    //   }

    // resetPageAndGetData() {
    //     setTimeout(() => {
    //         this.data.pageNo = 1
    //         this.getData()
    //     }, 0)
    // }

    // reset() {
    //     this.dto = new ListQueryWithCompanyId()
    //     this.resetPageAndGetData()
    // }
}
