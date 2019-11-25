import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../../../../core/role/role.service'
import { QRPeopleDTO } from '@core/role/qr-people-dto'
import { ContainPeopleDTO } from '@core/role/contain-people-dto'
import { ROLEPeopleDTO } from '@core/role/role-people-dto.ts'

import { NzMessageService } from 'ng-zorro-antd'
import { ProjectService } from '../../../../core/project/project.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-final-assembly-contain-detail',
  templateUrl: './final-assembly-contain-detail.component.html',
})
export class FinalAssemblyContainDetailComponent implements OnInit {
  @Input() userList:any
  lineId: number
    _finalAssemblyUser
    @Input()
    set finalAssemblyUser(val) {
      this._finalAssemblyUser = val
      // console.log(val)
      this.getDetailInfo()
    }

    get finalAssemblyUser() {
      return this._finalAssemblyUser
    }

    @Output() private outer = new EventEmitter<string>()

    userNumber = 5
    roleNumber = 1
    finalAssemBlyArr: any
    finalAssemBlyRole: any
    roleList: any = []
    qrPeopleDTO = new ContainPeopleDTO()
    roleDto = new ROLEPeopleDTO()
    // containPeopleDto = new ContainPeopleDTO()

    finalAssemblySetting = [
      { label:'围护扫码', value:0, tip:''},
      { label:'围护质检', value:1, tip:'至少指定一个总装质检人员'},
      // { label:'工地压板扫码', value:2, tip:'至少指定一个涂装扫码人员'},
      // { label:'涂装质检', value:3, tip:'至少指定一个涂装质检人员'},
    ]

    finalAssemblyRoleSetting = [
      { label:'工地压板扫码', value:0, tip:'至少指定一个涂装扫码人员'}
    ]

    arr = Array

    constructor(
        private roleService : RoleService,
        private message: NzMessageService,
        private projectService: ProjectService,
        private activatedRoute: ActivatedRoute
    ) { }

    async ngOnInit() {
      this.activatedRoute.queryParams.subscribe((res)=>{
        this.lineId = res.lineId
      })
      this.roleList = await this.roleService.rolesList()
      this.getData()
    }

    async getData() {
      let data = await this.roleService.fetchFinalContainUser(this.lineId)
      let processConfirms = data.linkList
      let roleConfirms = data.companyRoleLink
      roleConfirms = [roleConfirms]
      // console.log(roleConfirms,'已经选择过的角色')

      let finalAssemBlyArr = []
      let finalAssemBlyRole = []
      this.finalAssemblySetting.forEach(() => {
        finalAssemBlyArr.push([])
        finalAssemBlyRole.push([])
      })
      processConfirms && processConfirms.forEach(item => {
        if(item && item.userId){
          finalAssemBlyArr[item.type-4].push(item)
        }
      });
      this.finalAssemBlyArr = finalAssemBlyArr
      finalAssemBlyArr.forEach(item => {
        for(let i = item.length; i < this.userNumber; i++) {
          item.push(
            {
              productionLineId: this.lineId
            }
          )
        }
      })

      roleConfirms && roleConfirms.forEach(item => {
        if(item && item.roleId) {
          finalAssemBlyRole[item.type-4].push(item)
        }
      });

      this.finalAssemBlyRole = finalAssemBlyRole
      finalAssemBlyRole.forEach(item => {
        for(let i = item.length; i < this.roleNumber; i++) {
          item.push( { }  )
        }
      })
    }

    async getDetailInfo() {
    
    }

    async roleChange(item, index, type) {
      let selectQR = item[index]
      let _data = ''
      console.log(selectQR,'选择的数据选项-----')
      if(selectQR.roleId == -1) {
        this.roleDto.id = selectQR.id 
        _data = await this.roleService.delRolePeople(this.roleDto)
        if(_data) this.message.create('success', '删除成功');
      }else {
        this.roleDto.type = 4
        this.roleDto.roleId = selectQR.roleId
        _data = await this.roleService.saveSupplierPeople(this.roleDto)
        if(_data) this.message.create('success', '操作成功');
      }
    }

    async qrChange(item, index, type) {
      type = type === 0 ? 4: (type === 1 ? 5 : 6)
      let selectQR = item[index]
      // console.log(selectQR,'selc')
      this.qrPeopleDTO.userId = selectQR.userId
      this.qrPeopleDTO.productionLineId = selectQR.productionLineId
      this.qrPeopleDTO.id = selectQR.id
      // this.qrPeopleDTO = Object.assign({},selectQR)
      if(selectQR.userId == -1) {
        await this.roleService.del_containPeople(this.qrPeopleDTO)
        item[index].confirmUserId = null
        item[index].id = null
        this.message.create('success', '删除成功');
        return
      }
      if(this.qrPeopleDTO.id){
        // 更新
        let _data = await this.roleService.update_containPeople(this.qrPeopleDTO)
        if(_data === true){
          this.message.create('success', '更新成功');
        }
      }else{
        // 添加
        this.qrPeopleDTO.type = type
        let _data =  await this.roleService.saveContainPeople(this.qrPeopleDTO)
        item[index].id = _data
        if(Number.isInteger(_data)){
          this.message.create('success', '添加成功');
        }
      }
    }

    confirmDelete() {
      let id = this.finalAssemblyUser.id
      this.projectService.deleteLineUser(id).then((res) => {
        if(res ) {
          this.message.success("删除成功");
          // this.getDate()
          this.outer.emit('true')
        }
     })}

}
