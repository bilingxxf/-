import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { Project } from '@core/project/project'
import { ProjectService } from '../../../../core/project/project.service'
import { MARGIN_TYPES } from '../../../../constant/margin-types.enum'
import { ORDER_TYPES } from '../../../../constant/order-types.enum'
import { STRUCT_TYPES } from '../../../../constant/struct-types.enum'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '../../../../core/monomer/monomer.service'
import { Router, ActivatedRoute } from '@angular/router'
import { PagingData } from '@core/common-entity/paging-data'
import { Role } from '../../../../core/role/role'
import { RoleService } from '../../../../core/role/role.service'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
// import { isNgTemplate } from '@angular/compiler';
// import { ResponseData } from '../../../../interfaces';
import { NzMessageService } from 'ng-zorro-antd'
import { MaterialInboundOrder, MaterialInbound, Supplier } from '../../../../models'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'
import { QRPeopleDTO } from '@core/role/qr-people-dto'

@Component({
  selector: 'app-production-contain-detail', 
  templateUrl: './production-contain-detail.component.html',
  styles:[
    `.project-content{
      display:flex;
      justify-content: space-between;
      margin-bottom:10px;
    }`
  ]
})
export class ProductionContainLinDetail implements OnInit {
    @ViewChild('InboundForm') inboundForm: any
    @Input() projectId: number
    arr = Array
    lineId: number
    finalAssemblyUser = []
    currentFinalAssemblyUser: any
    isVisible: boolean = false;
    marginTypes = MARGIN_TYPES
    validateForm: FormGroup;
    structTypes = STRUCT_TYPES
    companyId: number
    orderTypes = ORDER_TYPES
    datas: any = {}
    detailData: any = []
    totalTada: any[] = []
    totalJian: any [] = []
    tuData: any [] = []
    tuJiData: any [] = []

    productLine: any
    styleList: any 
    userList: any  
    monomers: Monomer[] = []
    materialInbound = new MaterialInbound();
    addMemberForm: any = {}
    project = new Project()
    
    _formType = 0
    get formType() {
      return this._formType
    }
    data = new PagingData<Role>()
    dto = new ListQueryWithCompanyId()
    set formType(val) {
      this._formType = val;      
    }

    qrPeopleDTO = new QRPeopleDTO()

    constructor(
        private projectService: ProjectService,
        private monomerService: MonomerService,
        private router: Router,
        private roleService: RoleService,
        private activatedRoute: ActivatedRoute,
        private message: NzMessageService,
        private fb: FormBuilder
    ) { }

    async ngOnInit() {
        // console.log(this.projectId,this.lineId, '打印id')
        
        // console.log(this.datas.groupLinkList)
        this.styleList = [{
          name: '围护扫码',
          id: 4
        },{
          name: '围护质检',
          id: 5
        },{
          name: '围护工地扫码',
          id: 6
        }]
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
        this.validateForm = this.fb.group({
          userId: [ null, [ Validators.required ] ],
          styleId: [ null, [ Validators.required ] ]
        });
        this.roleService.lineProductNewUser().then(res => {
          this.userList = res
        })
        this.getDate()
    }

    async getDate() {
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.dto.id = res.lineId
      })
      this.addMemberForm = {
        userId: null,
        styleId: null,
        productLineId: this.dto.id
      }
      this.dto.size = 1000
      this.data = await this.roleService.searchLineId(this.dto)
      console.log('params--------------------------------', this.data)
      this.finalAssemblyUser = this.data.linkList
      this.lineId = this.data.id
      console.log(this.lineId, 1111)
      this.currentFinalAssemblyUser = this.finalAssemblyUser[0]
      // this.datas = this.data
      // this.detailData.push(this.datas.groupLinkList.总装,this.datas.groupLinkList.总装检验,this.datas.groupLinkList.涂装, this.datas.groupLinkList.涂装检验 )
      // this.totalTada = this.datas.groupLinkList.总装
      // this.totalTada.forEach(item => {
      //   // if(item){
      //     item.qrPeopleList = item.processConfirms
      //     for(let i = item.processConfirms.length - 1; i < 5; i++) {
      //       item.qrPeopleList.push(
      //         {
      //           productionLinkUserLinkId:item.id
      //         }
      //       )
      //     }
      //   // }
      // })
      // this.totalJian = this.datas.groupLinkList.总装检验
      // this.tuData = this.datas.groupLinkList.涂装
      // this.tuJiData = this.datas.groupLinkList.涂装检验
    }

    async qrChange(item, index) {
      let selectQR = item.qrPeopleList[index]
      this.qrPeopleDTO = Object.assign({},selectQR)
      console.log('selectQR---------------',item, this.qrPeopleDTO,)
      if(selectQR.confirmUserId == -1) {
        await this.roleService.del_qrPeople(this.qrPeopleDTO)
        item.qrPeopleList[index].confirmUserId = null
        item.qrPeopleList[index].id = null
        this.message.create('success', '删除成功');
        return
      }
      if(this.qrPeopleDTO.id){
        // 更新
        await this.roleService.update_qrPeople(this.qrPeopleDTO)
        this.message.create('success', '更新成功');
      }else{
        // 添加
        item.qrPeopleList[index].id =  await this.roleService.create_qrPeople(this.qrPeopleDTO)
        this.message.create('success', '添加成功');
      }
    }

    addUser(item) {
      console.log(item)
      this.isVisible = true
      // this.addMemberForm.styleId = styleId
      this.addMemberForm.productLineId = item.productionLineId
    }
    
    handleOk() {
      // console.log(this.addMemberForm.roleId, this.addMemberForm.productLineId, this.addMemberForm.styleId)
      for (const i in this.validateForm.controls) {
          this.validateForm.controls[ i ].markAsDirty();
          this.validateForm.controls[ i ].updateValueAndValidity();
      }  
      if( this.validateForm.controls.userId.value) {
        this.roleService.addRoleProduct(this.addMemberForm.userId, this.addMemberForm.productLineId, 0).then(res => {
          if(res) {
             this.message.success("新增用户成功");
             this.isVisible = false
             this.validateForm.reset();
             this.getDate()
           }
         })
      }
    }
    getFormControl(name) {
      return this.validateForm.controls[ name ];
  }
    confirmDelete(id: number) {
      this.projectService.deleteLineUser(id).then((res) => {
        if(res ) {
          this.message.success("删除成功");
          this.getDate()
        }
     })}

    handleCancel() {
      this.isVisible = false;
      this.validateForm.reset();
    }

    go(){
        this.projectId = 1
        this.router.navigate(['/detail-edit',this.projectId])
    }

}