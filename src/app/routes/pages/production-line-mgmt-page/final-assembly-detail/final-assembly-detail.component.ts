import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from '../../../../core/role/role.service'
import { QRPeopleDTO } from '@core/role/qr-people-dto'
import { NzMessageService } from 'ng-zorro-antd'
import { ProjectService } from '../../../../core/project/project.service'

@Component({
  selector: 'app-final-assembly-detail',
  templateUrl: './final-assembly-detail.component.html',
})
export class FinalAssemblyDetailComponent implements OnInit {
    _finalAssemblyUser
    @Input()
    set finalAssemblyUser(val) {
      this._finalAssemblyUser = val
      this.getDetailInfo()
    }

    get finalAssemblyUser() {
      return this._finalAssemblyUser
    }

    @Input() userList:any

    @Output() private outer = new EventEmitter<string>()

    userNumber = 3

    finalAssemBlyArr:any

    qrPeopleDTO = new QRPeopleDTO()

    finalAssemblySetting = [
      { label:'总装扫码', value:0, tip:''},
      { label:'总装质检', value:1, tip:'至少指定一个总装质检人员'},
      { label:'涂装扫码', value:2, tip:'至少指定一个涂装扫码人员'},
      { label:'涂装质检', value:3, tip:'至少指定一个涂装质检人员'},
    ]

    arr = Array

    constructor(
        private roleService : RoleService,
        private message: NzMessageService,
        private projectService: ProjectService
    ) { }

    async ngOnInit() {
      // this.finalAssemblySetting.forEach(() => {
      //   this.finalAssemBlyArr.push([])
      // })
    }

    async getDetailInfo() {
      if(this.finalAssemblyUser && this.finalAssemblyUser.id) {
        let data = await this.roleService.fetchFinalAssemblyUser(this.finalAssemblyUser.id)
        let processConfirms = data.processConfirms
        console.log(processConfirms,data, '数据数据---')
        let finalAssemBlyArr = []
        this.finalAssemblySetting.forEach(() => {
          finalAssemBlyArr.push([])
        })
        processConfirms && processConfirms.forEach(item => {
          if(item && item.confirmUserId && parseInt(item.type) < this.finalAssemblySetting.length){
            finalAssemBlyArr[item.type].push(item)
          }
        });

        console.log(finalAssemBlyArr,'组合的数据======')
        
        finalAssemBlyArr.forEach(item => {
            for(let i = item.length; i < this.userNumber; i++) {
              item.push(
                {
                  productionLinkUserLinkId: this.finalAssemblyUser.id
                }
              )
            }
        })
        this.finalAssemBlyArr = finalAssemBlyArr
      }
      
    }

    async qrChange(item, index, type) {
      let selectQR = item[index]
      this.qrPeopleDTO = Object.assign({},selectQR)
      if(selectQR.confirmUserId == -1) {
        await this.roleService.del_qrPeople(this.qrPeopleDTO)
        item[index].confirmUserId = null
        item[index].id = null
        this.message.create('success', '删除成功');
        return
      }
      if(this.qrPeopleDTO.id){
        // 更新
        let _data = await this.roleService.update_qrPeople(this.qrPeopleDTO)
        if(_data === true){
          this.message.create('success', '更新成功');
        }
      }else{
        // 添加
        this.qrPeopleDTO.type = type
        let _data =  await this.roleService.create_qrPeople(this.qrPeopleDTO)
        item[index].id = _data
        console.log(_data,'添加===')
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
