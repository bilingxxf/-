import * as moment from 'moment'
import { Component, OnInit, Input } from '@angular/core'
import { ProductDemand, PlanItem } from '@core/product-demand/product-demand'
import { ProductDemandPlanCDto } from '@core/product-demand/product-demand-plan-c-dto'
import { TaskDto } from '@core/product-demand/task-dto'
import { ProductDemandService } from '../../../../core/product-demand/product-demand.service'
import { NzMessageService, NzModalRef } from 'ng-zorro-antd' // NzThDirective
import { ProductDemandPriority } from '../../../../constant/product-demand-priority.enum'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { Colors } from 'app/constant/colors.enum'
// import { PlanService } from '@core/plan/plan.service'
import { TaskService } from '@core/product-demand/task.service'
import { RoleService } from '../../../../core/role/role.service'
import { PagingData } from '@core/common-entity/paging-data'
import { Role } from '../../../../core/role/role'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'




@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
})
export class TaskPopup implements OnInit {

    @Input() productDemand = new ProductDemand()

    @Input() box: Box[] = []

    @Input() max: number = 1;

    @Input() history: PlanItem[] = [];
    data = new PagingData<Role>()

    productDemandPriority = ProductDemandPriority

    submitting = false

    dto = new TaskDto()
    paramsId = new ListQueryWithCompanyId()


    constructor( 
        public productDemandService: ProductDemandService,
        private msg: NzMessageService,
        private subject: NzModalRef,
        private TaskService: TaskService,
        private roleService: RoleService,

    ) { }
    //生产线下拉框数据
    // listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
    listOfOption = this.data
    listOfSelectedValue: any;

//   isNotSelected(value: string): boolean {
    //   console.log('this.listOfSelectedValue-----------',this.listOfSelectedValue)
    // console.log('value--------------',value)
    // return this.listOfSelectedValue.indexOf(value) === -1;
//   }
  //生产线数据请求
  async getProductionLineList (){
    this.data = await this.roleService.productionLine(this.paramsId)
    let _productLineId = sessionStorage.getItem('productLine') || -1
    let _listOfSelectedValue = this.data.data.filter(l => l.id == _productLineId)
    if(_listOfSelectedValue && _listOfSelectedValue.length > 0) {
        this.listOfSelectedValue =  _listOfSelectedValue[0]
    }
  }
    ngOnInit() {
        this.history = this.history.map(val => {
            val.date = moment(val.demandDate).format('YYYY-MM-DD');
            return val
        })
        console.log('this.history',this.history)
        this.getProductionLineList()
        // console.log(this.listOfOption,'hddhdh')
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        if(!this.listOfSelectedValue) {
            return
        }
        this.submitting = true;
        const dtos: TaskDto[] = this.box.map(val => {
            console.log('val----------------------------------', val);
            const dto = new TaskDto();
            dto.needQuantity  = this.dto.needQuantity;
            //生产线
            // dto.needQuantity  = this.dto.productionLine
            // 临时缓存
            sessionStorage.setItem('productLine', this.listOfSelectedValue.id)
            dto.productId = val.id;
            // dto.deadline = moment(this.productDemandService.date).format('YYYY-MM-DD');
            dto.deadline  = moment(this.productDemandService.date).valueOf();
            dto.productionLine = this.listOfSelectedValue.name
            dto.productionLineId = this.listOfSelectedValue.id
            dto.name = val.content
            // dto.productionLineId  =  ;
            // dto.productionLineId = val.content.split(' ')[0]
            // dto.serialNo= val.content.split(' ')[1]
            dto.date = moment(dto.deadline).format('YYYY-MM-DD')
            let _date:any = dto.date + ' 23:59:59'
            _date = new Date(_date).getTime()
            dto.deadline = _date
            console.log(_date);
            val.areas.push({
                color: Colors.WARN,
                percent: this.dto.needQuantity / val.total
            })
            val.length += 1;
            let preArr:any = val.content.split(' ');
        
            let pre:any = preArr[2].split('/')

            pre[0] = Number(Number(pre[0]) + this.dto.needQuantity)
            pre = pre.join('/')
            preArr[2] = pre
            preArr = preArr.join(' ')
            // const pre = Number(/\s(\d)/g.exec( val.content)[0])
            // val.content = val.content.replace(/\s(\d)/g, ' ' + Number(pre + this.dto.needQuantity) + '')
            // dto.current = Number(pre + this.dto.needQuantity);
            val.content = preArr
            this.TaskService.addplan1(dto);
            return dto
        })
        // this.planService.boxes$.next(this)
        try {
            // await this.productDemandService.batch(dtos);

            // this.msg.success('添加成功');
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false;

        }
        this.submitting = false;
    }

}
