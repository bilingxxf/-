import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductDemandQueryDto } from '@core/product-demand/product-demand-query-dto'
import { ProductDemandService } from '@core/product-demand/product-demand.service'
import { RoleService } from '@core/role/role.service'
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { ProductStatus } from '../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../constant/component-colors.enum';
import * as moment from 'moment'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls:['./task-list.component.less']
})
export class TaskListComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;

    // 区域id
    _monomerId: number
    @Input() 
    set monomerId(val: number) {
        this._monomerId = val;
        if(this._monomerId){
          // this.taskDTO.page = 1
          this.getTaskList()
        }
    }

    get monomerId() {
        return this._monomerId;
    }

    checkOptionsOne = [
      { label: 'Apple', value: 'Apple', checked: true },
    ];

    isSpinning = false // loading

    active = 1

    dataSet: any[] = []

    totalCount:number = 0

    lineEmployees: any[] = []

    nzWidthConfig: string[] = []

    xWidth:string = '550px'

    taskDTO = new ProductDemandQueryDto()

    ProductStatus = ProductStatus
    
    ComponentColors = ComponentColors

    allChecked: boolean = false

    indeterminate: boolean = false

    // 被选择分配的班组
    selectedTeamId: any 

    constructor(
      private roleService: RoleService,
      private productDemandService: ProductDemandService,
      private message: NzMessageService,
      private modalService: NzModalService
    ) { }

    ngOnInit() {
      console.log('taskDTO----------------',this.taskDTO)
      this.getProductLineInfo()
    }

    /**
     *重新分配任务
     *
     * @memberof TaskListComponent
     * @author duhh
     */
    async reassignTasks() {
      this.toggleBlocking('数据重置中，请稍后')
      let data = await this.productDemandService.reassignTasks(this.monomerId)
      if(data) {
        this.message.create('success', `操作成功`);
      }else{
        this.message.create('error', `操作失败`);
      }
      this.blockUI.stop();
    }

    async saveOperate() {
      this.toggleBlocking('数据保存中，请稍后')
      let submitData = []
      this.dataSet.forEach(acomponent => {
        acomponent.manufacturePlans.forEach(({needQuantity, hasChangeQuantity, deadline, hasChangeDeadline, userId, productId, productionLineId, hasChagne, id}) => {
          if((hasChangeQuantity || hasChangeDeadline) && (id || needQuantity > 0)) {
            deadline = moment(deadline).endOf('day').format('YYYY-MM-DD HH:mm:ss')
            needQuantity = needQuantity ? needQuantity : 0
            // console.log(deadline)
            submitData.push({needQuantity,deadline,userId,productId,productionLineId,id})
          }
        })
      })
      console.log('submitData--------------------------------',submitData)
      this.productDemandService.batch11(submitData).then(() => {
        this.dataSet.forEach(acomponent => {
          acomponent.manufacturePlans.forEach(task => {
            // task.hasChagne = false
            task.hasChangeQuantity = false
            task.hasChangeDeadline = false
          })
        })
        this.blockUI.stop();
        this.message.create('success', `保存成功`);
        this.getTaskList()
      }).catch(() => {
        // 关闭loading组件
        this.blockUI.stop();
      });
      // 关闭loading组件
      // this.blockUI.stop();
    }

    async getTaskList() {
      // this.toggleBlocking('数据整理中，请稍后')
      this.isSpinning = true
      this.taskDTO.areaDivisionId = this.monomerId
      let data = await this.productDemandService.list2(this.taskDTO)
      this.totalCount = data.totalCount // 总页数
      this.lineEmployees.forEach(lineE => {
        lineE.hasData = false
      })
      let _dataset = data.data.map(d => {
        let _manufacturePlans = []
        let _date = moment(new Date()).format('YYYY-MM-DD')
        this.lineEmployees.forEach(lineE => {
          let _tempFlag = false
          if(d.manufacturePlans) {
            for(let i in d.manufacturePlans) {
              if(d.manufacturePlans[i].userId == lineE.userId && d.manufacturePlans[i].productionLineId == lineE.productionLineId){
                // d.manufacturePlans[i].hasChagne = false
                _manufacturePlans.push(
                  {
                    needQuantity: d.manufacturePlans[i].needQuantity ? d.manufacturePlans[i].needQuantity : "",
                    originNeedQuantity:d.manufacturePlans[i].needQuantity ? d.manufacturePlans[i].needQuantity : "",
                    deadline: d.manufacturePlans[i].deadline ? moment(d.manufacturePlans[i].deadline).format('YYYY-MM-DD') : "",
                    originDeadline: d.manufacturePlans[i].deadline ? moment(d.manufacturePlans[i].deadline).format('YYYY-MM-DD') : "",
                    userId: lineE.userId,
                    teamId: lineE.id,
                    productId: d.productId,
                    productionLineId: lineE.productionLineId,
                    // hasChagne: false,
                    hasChangeQuantity: false,
                    hasChangeDeadline: false,
                    id: d.manufacturePlans[i].id,
                  }
                )
                _tempFlag = true
                // if(lineE.hasData){ // 直接赋值效率更高
                  lineE.hasData = true
                // }
                break;
              }
            }
          }
          if(!_tempFlag) {
            _manufacturePlans.push({
              needQuantity: "",
              originNeedQuantity: "",
              deadline: _date,
              originDeadline: _date,
              userId: lineE.userId,
              teamId: lineE.id,
              productId: d.productId,
              productionLineId: lineE.productionLineId,
              // hasChagne: false,
              hasChangeQuantity: false,
              hasChangeDeadline: false,
            })
          }
          // 
          _manufacturePlans
        })
        // this.setMaxNum(_manufacturePlans, d.totalQuantity)
        d.manufacturePlans = _manufacturePlans
        d.isChecked = false
        this.setMaxNum(d)
        return d;
      })
      // 关闭loading组件
      // this.blockUI.stop();
      setTimeout(() => {
        this.dataSet = _dataset
        this.isSpinning = false
      }, 1000);
    }

    setMaxNum(component) {
      let tasks = component.manufacturePlans
      if(tasks && tasks.length > 0) {
        let count = 0
        let max = 0
        tasks.forEach(task => {
          count += task.needQuantity ? task.needQuantity : 0
        });
        max = component.totalQuantity - count
        // tasks.forEach(task => {
        component.maxNum = max
        // });
      }
    }

    // 获取表格宽度配置
    getWidthConfig() {
      const defaultConfig =  ['60px','60px', '100px', '100px', '100px', '100px'];
      const defaultDynamicConfig = ['100px','130px'];
      const defaultWidth = 670
      const deaultDynamicWidth = 230
      let dynamicWidthCount = 0
      this.lineEmployees.forEach(c => {
        if(c.showLine) {
          defaultDynamicConfig.forEach(d => {
            defaultConfig.push(d)
          })
          dynamicWidthCount += deaultDynamicWidth
        }
      })
      this.xWidth = (dynamicWidthCount + defaultWidth) + 'px'
      this.nzWidthConfig = [...defaultConfig, 'null','100px']
      console.log('this.nzWidthConfig------------------', this.nzWidthConfig)
    }

    async getProductLineInfo() {
      // this.lineEmployees
      const productLineEmployees = await this.roleService.fetchProductLineInfo()
      console.log('this.productLineEmployees-----------------', productLineEmployees)
      this.getTaskList()
      let lineEmployees = [];
      productLineEmployees && productLineEmployees.forEach(line => {
        line && line.userList && line.userList.forEach(employ => {
          if(employ && employ.id) { // 筛选出所有生产线人员
            employ.userLineName = line.name + '-' + employ.userName
            employ.showLine = false
            employ.hasData = false
            lineEmployees.push(employ)
          }
        });
      })
      this.lineEmployees = lineEmployees
      console.log('this.lineEmployees-----------------', lineEmployees)
      this.getWidthConfig()
    }

    lineChange(value: object[]) {
      this.getWidthConfig()
    }

    search() {
      this.taskDTO.page = 1;
      this.getTaskList()
    }

    setTaskNum(acomponent,index) {
      // this.isSpinning = true
      let task = acomponent.manufacturePlans[index]
      
      
      
      setTimeout(() => {
        // task.hasChagne = true
        this.setMaxNum(acomponent)
        if(acomponent.maxNum < 0) {
          task.needQuantity = 0
          this.setMaxNum(acomponent)
          this.message.create('error', `超出总数量${Math.abs(acomponent.maxNum)}件，重置为0，请重新填写`);
        }
        // task.hasChagne = task.originNeedQuantity !== task.needQuantity
        task.hasChangeQuantity = task.originNeedQuantity !== task.needQuantity
        // this.isSpinning = false
      }, 50);
        
    }

    changeDate(acomponent, index) {
      let task = acomponent.manufacturePlans[index]
      // task.hasChagne = true
      // task.hasChangeDeadline = true
      // task.hasChagne = task.originNeedQuantity !== task.needQuantity
      task.hasChangeDeadline = task.originDeadline !== moment(task.deadline).format('YYYY-MM-DD')
      console.log(task.originDeadline, '            ', task.deadline)
    }

    /**
     * 弹出loading组件
     * @param message loading下方的提示信息
     */
    toggleBlocking(message?: string) {
      this.blockUI.start(message);
    }

    allotAll() {
      if(!this.selectedTeamId){
        this.createMessage('warning', '请选择要分配的班组')
        return
      }
      if(!this.allChecked && !this.indeterminate){
        this.createMessage('warning', '请选择构件')
        return
      }
      // 分配
      this.dataSet.filter(item => item.isChecked).forEach(item => {
        if(item.manufacturePlans && item.manufacturePlans.length > 0){
          for(let i in item.manufacturePlans) {
            if(item.manufacturePlans[i].teamId == this.selectedTeamId) {
              item.manufacturePlans[i].needQuantity = item.totalQuantity
              this.setTaskNum(item,i)
              break
            }
          }
        }
      })
      this.checkAll(false)
    }

    createMessage(type: string, msg: string): void {
      this.message.create(type, msg);
    }

    keyUpSearch(e) {
      console.log('keyUpSearch-----------------------------------------',e)
    }

    refreshStatus() {
      const allChecked = this.dataSet.filter(item => item.maxNum == item.totalQuantity).every(item => item.isChecked)
      const indeterminate = this.dataSet.filter(item => item.maxNum == item.totalQuantity).some(item => item.isChecked)
      this.allChecked = allChecked
      this.indeterminate = !allChecked && indeterminate
    }

    checkAll(value: boolean) {
      if (value) {
        this.dataSet.forEach((val) => {
            if (val.maxNum == val.totalQuantity) {
              val.isChecked = true
            }
        })
      } else {
          this.dataSet.forEach(data => data.isChecked = false)
      }
      this.refreshStatus()
    }

}
