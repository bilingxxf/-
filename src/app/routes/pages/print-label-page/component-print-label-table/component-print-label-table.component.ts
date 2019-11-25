import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ProductService } from '@core/product/product.service'
import { PagingData } from '@core/common-entity/paging-data'
import { ComponentQueryDto } from '@core/product/component-query-dto'
import { ProductComponent } from '@core/product/product-component'
import { NzModalService } from 'ng-zorro-antd'
import { ComponentLabelPreviewModalComponent } from '../component-label-preview-modal/component-label-preview-modal.component'
import { ProjectService } from '@core/project/project.service'
import { PrintService } from '@core/print/print.service'
import { PrintHistory } from '@core/product/product-print-history.dto';
import { ComponentLabelHistoryModalComponent } from '../component-label-history-modal/component-label-history-modal.component';
import { NzMessageService } from 'ng-zorro-antd'
import { CompanyService } from '@core/company/company.service'
import { UserService } from '@core/user/user.service'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../constant/component-colors.enum';

@Component({
    selector: 'app-component-print-label-table',
    templateUrl: './component-print-label-table.component.html',
    styleUrls: ['./component-print-label-table.component.less']
})
export class ComponentPrintLabelTableComponent implements OnInit {

    _areaId: number
    @Input()
    set areaId(val) {
        this._areaId = val;
        this.dto.page = 1
        this.getData();
    }

    get areaId() {
        return this._areaId
    }

    _productionLine
    @Input()
    set productionLine(val) {
      this._productionLine = val;
      this.dto.page = 1
      this.getData();
    }

    get productionLine() {
      return this._productionLine
    }


    @Input() areaName: string

    @Input() projectId: number

    @Input() monomerName: string

    @Output() priceChange = new EventEmitter<void>()

    checkOptionsOne = [
      { label: '显示重量', value: 'weight', checked: true },
      // { label: '显示制造商', value: 'manufacturer', checked:true }
    ];

    manufacturerName:string

    allChecked = false

    indeterminate = false

    dto = new ComponentQueryDto()

    data = new PagingData<any & { count?: number, checked?: boolean }>()
    productStatus = ProductStatus;

    ComponentColors= ComponentColors;
    
    isPrintSpinning:Boolean = false

    project:any = {}

    company:any = {}

    isSpinning:boolean = false

    printTip:string = '正在打印'

    constructor( 
        private productService: ProductService,
        private printService: PrintService,
        private modal: NzModalService,
        private projectService: ProjectService,
        private msg: NzMessageService,
        private companyService: CompanyService,
        private userService: UserService,
    ) { }

    log(value: object[]): void {
      console.log(value);
    }

    search() {
        this.dto.page = 1
        this.getData()
    }

    async ngOnInit() {
      this.project = await this.projectService.getProjectInfoDetail(this.projectId)
      const compamyId = (await this.userService.getCurrentUserInfo()).companyId
      this.company = (await this.companyService.f(compamyId))
    }

    async getCheckList() {
      const data = this.data.data.filter(val => {
        return val.checked
      })
      if (!data.length) {
        this.msg.info('选择需要打印的数据');
        return
      }
      this.isPrintSpinning = true
      let breakFlag = false
      // 当前打印的对象下标【此处可以改为for(;;)】
      let currentItemIndex = 0
      for(const item of data) {
        // 设置当前打印次数0
        item.currentPrintNum = 0
        for(let i = 0; i< item.count; i++){
          let printSuccess:Boolean = true
          let printMsg = '打印成功'
          console.log(`开始打印${item.structure.name}`)
          this.printTip = `${item.structure.name}【${item.structure.serialNo}】 第${i + 1}张 正在打印`
          try {
            printSuccess = await this.printService.printComponent({
              projectShortName: this.project.shortName,
              monomerName: this.monomerName,
              cmptArea: this.areaName,
              cmptName: item.structure.name,
              cmptNo: item.structure.serialNo,
              cmptSpec: item.structure.specification,
              cmptNum: item.structure.quantity,
              cmptLength: item.structure.length,
              cmptWeight: this.checkOptionsOne[0].checked ? item.structure.pieceWeight : '',
              manufacturerName: this.manufacturerName ? this.manufacturerName : this.company.name,
              qrCode: JSON.stringify({
                id: item.structure.id,
                type: item.structure.type,
                manufacturePlanId: item.id
              })
            })
            console.log(`结束打印${item.structure.name}-${printSuccess}`)
            if(!printSuccess) {
              if(item.currentPrintNum > 0 || currentItemIndex > 0) {
                printMsg = '部分构件打印失败，请重新打印'
              } else {
                printMsg = '打印失败，请重新打印'
              }
              
            }
          } catch (error) {
            printSuccess = false
            printMsg = '打印失败，请重新打印'
          } finally {
            if(!printSuccess) {
              this.isPrintSpinning = false
              breakFlag = true
              this.msg.create('error', printMsg);
              break
            }else {
              // 修改打印相关数据
              item.currentPrintNum++
              item.printNumber++
            }
          }
        }
        // 打印后添加打印记录
        this.createPrintHistory(item)
        if(breakFlag) {
          break
        }
        currentItemIndex++
      }
      this.isPrintSpinning = false
      // if(breakFlag) {
      // 处理打印数据
      this.filterHasPrintData(data)
      // } else {
      //   this.getData();
      // }
    }

    // 过滤已经打印的数据
    filterHasPrintData(data) {
      if(!data || data.length) {
        data.forEach( l => {
          console.log(`${l.structure.name} ${l.structure.serialNo}（已打印的应打印数量[未修改]: ${l.printProductNumber} | 当前已打印数量: ${l.currentPrintNum} | 当前需打印的数量: ${l.count}）`)
          l.printProductNumber = (l.printProductNumber + l.currentPrintNum) < l.needQuantity ? l.printProductNumber + l.currentPrintNum : l.needQuantity
          if(l.count <= l.currentPrintNum) {
            l.checked = false
            l.count = l.needQuantity
            l.currentPrintNum = 0
          }else{
            l.count = l.count - l.currentPrintNum
          }
        })
        this.refreshStatus()
      }
    }

    async print() {
        this.getCheckList()
    }

    async createPrintHistory(item, number = null) {
      let data = new PrintHistory() 
      if(number == null || number == undefined || isNaN(number)) {
        number = item.currentPrintNum || 0
      }
      if(number <= 0) {
        return false
      }
      data = {
        productId: item.structure.id,
        projectId: this.projectId,
        quantity: number,
        manufacturePlanId: item.id
      }
      try {
        let callback = await this.productService.uploadPrintHis([data]);
        if( Number.isInteger(callback) && callback > 0) {
          return true
        } else {
          this.msg.create('error', `${item.structure.name} ${item.structure.serialNo} 打印记录添加失败`);
          return false
        }
      } catch (error) {
        this.msg.create('error', `${item.structure.name} ${item.structure.serialNo} 打印记录添加失败，未联网或服务器错误`);
      }
    }

    async batchCreatePrintHistory(data) {
        const params  = data.map(val => {
            const item = new PrintHistory();
            item.productId = val.structure.id;
            item.projectId = this.projectId;
            item.quantity = val.currentPrintNum;
            item.manufacturePlanId = val.id
            return item
        })
        let callback = await this.productService.uploadPrintHis(params);
        // if( Number.isInteger(callback) && callback > 0) {
        //   this.print()
        // } else {
        //   this.msg.create('error', '打印失败');
        // }
    }

    history(component: any) {
        this.modal.create({
          nzTitle: '打印记录',
          nzContent: ComponentLabelHistoryModalComponent,
          nzComponentParams: {
                productId: component.structure.id,
                manufacturePlanId: component.id
            },
            nzWidth: 800,
            nzFooter: null
        })
    }

    async getData() {
        this.isSpinning = true
        try {
          this.dto.areaDivisionId = this.areaId
          if(this.dto.areaDivisionId && this.productionLine && this.productionLine.userId && this.productionLine.productionLineId){
            this.dto.userId = this.productionLine.userId
            this.dto.productionLineId = this.productionLine.productionLineId
            this.data = await this.productService.listByAreaAndLine(this.dto)
            this.data.data.forEach(o => {
              o.count = o.needQuantity - o.printProductNumber > 0 ? o.needQuantity - o.printProductNumber : 1;
              o.currentPrintNum = 0
              o.expend = false
            })
            this.refreshStatus()
          }
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    async preview(component: ProductComponent) {
        this.modal.create({
          nzTitle: '查看标签',
          nzContent: ComponentLabelPreviewModalComponent,
          nzComponentParams: {
              labelContent: {
                projectShortName: this.project.shortName,
                monomerName: this.monomerName,
                cmptArea: this.areaName,
                cmptName: component.structure.name,
                cmptNo: component.structure.serialNo,
                cmptSpec: component.structure.specification,
                cmptNum: component.structure.quantity,
                cmptLength: component.structure.length,
                cmptWeight: component.structure.pieceWeight,
                manufacturerName: this.company.name,
                qrCode: JSON.stringify({
                  id: component.structure.id,
                  type: component.structure.type,
                  manufacturePlanId: component.id
                })
              }
            },
            nzWidth: 600,
            nzFooter: null
        })
    }

    refreshStatus() {
        const allChecked = this.data.data.every(value => value.checked === true)
        const allUnChecked = this.data.data.every(value => !value.checked)
        this.allChecked = allChecked
        this.indeterminate = (!allChecked) && (!allUnChecked)
      }

    checkAll(value: boolean) {
        if (value) {
          this.data.data.forEach((val) => {
              if (val.structure.status !== 2) {
                val.checked = true
              }
          })
        } else {
            this.data.data.forEach(data => data.checked = false)
        }
        this.refreshStatus()
      }
}
