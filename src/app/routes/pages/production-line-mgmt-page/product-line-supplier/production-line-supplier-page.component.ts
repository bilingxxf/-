import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../../../../core/role/role.service'
import { ContainPeopleDTO } from '@core/role/contain-people-dto'
import { NzMessageService } from 'ng-zorro-antd'
import { ProjectService } from '../../../../core/project/project.service'
import { type } from 'os';

@Component({
  selector: 'app-production-line-supplier-page',
  templateUrl: './production-line-supplier-page.component.html',
})
export class ProductionLineSupplierComponent implements OnInit {
  _finalAssemblyUser
  @Input()
  set finalAssemblyUser(val) {
    console.log(val)
    if(val) {
      this._finalAssemblyUser = val
      this.getDetailInfo()
    }
    
  }

  get finalAssemblyUser() {
    return this._finalAssemblyUser
  }

  userList: any
  roles: any
  @Output() private outer = new EventEmitter<string>()

  userNumber = 5
  roleNumber = 1
  finalAssemBlyArr: any
  finalAssemBlyArrRole: any
  qrPeopleDTO = new ContainPeopleDTO()

  finalAssemblySetting: any

  arr = Array

  constructor(
    private roleService: RoleService,
    private message: NzMessageService,
    private projectService: ProjectService
  ) { }

  async ngOnInit() {
    this.roleService.lineProductNewUser().then(res => {
      this.userList = res
    })
    this.roleService.rolesList().then(res => {
      this.roles = res
    })
    
  }
  async getData() {  }

  async getDetailInfo() {
    if (this.finalAssemblyUser && this.finalAssemblyUser.supplierId == 0) {
      this.finalAssemblySetting = [
        { label: '供应商', value: 0, type: 1, tip: '', num: 1},    //角色
        { label: '审核确认', value: 1, type: 0, tip: '', num: 5 },  // 用户
        { label: '收货确认', value: 2, type: 2, tip: '', num: 1}]  // 角色 
    } else {
      this.finalAssemblySetting = [
        { label: '供应商', value: 0, type: 3, tip: '', num: 1 },   // 角色
        { label: '审核确认', value: 2, type: 4, tip: '', num: 5 }] // 用户
    }
    let data = await this.roleService.fetchSiteUser()
    let _userData = await this.roleService.fetchFactoryUser()
    let checkUsers = []
    let roleList = []
    if(this.finalAssemblyUser.supplierId == 0) {
      checkUsers = data.checkUsers
      roleList = data.roleList
    }else {
      checkUsers = _userData.checkUsers
      roleList = _userData.supplierRole
    }
   
    let finalAssemBlyArr = []
    let finalAssemBlyArrRole = []
    for(var i=0;i<5;i++) {
      finalAssemBlyArr.push([])
      finalAssemBlyArrRole.push([])
    }
      
    checkUsers && checkUsers.forEach(item => {
      if(item && item.userId && parseInt(item.type)){
        finalAssemBlyArr[item.type].push(item)
      }
    });
    roleList && roleList.forEach(item => {
      if(item && item.roleId && parseInt(item.type) ){
        finalAssemBlyArrRole[item.type].push(item)
      }
    });

    finalAssemBlyArr.forEach(item => {
      for (let i = item.length; i < this.userNumber; i++) { item.push({ })}
    })
    this.finalAssemBlyArr = finalAssemBlyArr
  
    finalAssemBlyArrRole.forEach(item => {
      for (let i = item.length; i < this.roleNumber; i++) {
        item.push({
          supplierId: this.finalAssemblyUser.supplierId
        })
      }
    })
    this.finalAssemBlyArrRole = finalAssemBlyArrRole
  }

  async qrChange(item, index, type) {
    let selectQR = item[index]
    this.qrPeopleDTO.type = type
    console.log(selectQR, index, '选择的数据')
    let _data = false
    if (type == 0 || type == 4) {
      this.qrPeopleDTO.userId = selectQR.userId
    } else {
      this.qrPeopleDTO.roleId = selectQR.roleId
    }
    if (selectQR.roleId == -1 || selectQR.userId == -1) {
      this.qrPeopleDTO.id = selectQR.id
      if (type == 0 || type == 4) {
        await this.roleService.delUserPeople(this.qrPeopleDTO)
        item[index].userId = null
        item[index].id = null
      } else {
       await this.roleService.delRolePeople(this.qrPeopleDTO) 
        item[index].roleId = null
        item[index].id = null
      }
      return
    }

    if (selectQR.id) { // 更新
      console.log('更新')
      if (type == 0 || type == 4) {
        this.qrPeopleDTO.id = selectQR.id
        _data = await this.roleService.updateUserPeople(this.qrPeopleDTO)
        if(_data) this.message.create('success', '用户更新成功');
      } else {
        _data = await this.roleService.saveSupplierPeople(this.qrPeopleDTO)
        if(_data) this.message.create('success', '角色更新成功');
      }

    } else {  // 添加
      console.log('添加')
      if (type == 0 || type == 4) {
        this.qrPeopleDTO.type = type == 0 ? 1: 2
        _data = await this.roleService.saveUserPeople(this.qrPeopleDTO)
        item[index].id = _data
        if(_data) this.message.create('success', '用户添加成功');
      } else {
        delete this.qrPeopleDTO.id
        _data = await this.roleService.saveSupplierPeople(this.qrPeopleDTO)
        item[index].id = _data
        if(_data) this.message.create('success', '角色添加成功');
      }
    }
  }

  confirmDelete() {
    let id = this.finalAssemblyUser.id
    this.projectService.deleteLineUser(id).then((res) => {
      if (res) {
        this.message.success("删除成功");
        // this.getDate()
        this.outer.emit('true')
      }
    })
  }

}
