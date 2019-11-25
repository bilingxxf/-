import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { SupportMaterialQueryDto } from '@core/support-material/support-material-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { SupportMaterial } from '@core/support-material/support-material'
import { ProductService } from '@core/product/product.service'
import { NzModalService } from 'ng-zorro-antd'
import { ProjectService } from '@core/project/project.service'
import { PrintService } from '@core/print/print.service'
import { SupportMaterialService } from '@core/support-material/support-material.service'
import { SuppoprtMaterialLabelPreviewModalComponent } from '../suppoprt-material-label-preview-modal/suppoprt-material-label-preview-modal.component'
import { PrintHistory } from '@core/product/product-print-history.dto';
import { ComponentLabelHistoryModalComponent } from '../component-label-history-modal/component-label-history-modal.component';
import { getLodop } from '../../../../../static/LodopFuncs.js';
import { NzMessageService } from 'ng-zorro-antd'
import { CompanyService } from '@core/company/company.service'
import { UserService } from '@core/user/user.service'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../constant/component-colors.enum';

@Component({
    selector: 'app-suppoprt-material-print-lable-table',
    templateUrl: './suppoprt-material-print-lable-table.component.html',
})
export class SuppoprtMaterialPrintLableTableComponent implements OnInit {

    _monomerId: number;
    @Input() 
    get monomerId() {
      return this._monomerId
    }
    set monomerId(val: number) {
      this._monomerId = val;
      this.dto.monomerId = this.monomerId
      this.getData();
    }

    @Input() monomerName: string
    @Input() projectId: number

    @Output() priceChange = new EventEmitter<void>()

    allChecked = false

    indeterminate = false

    dto = new SupportMaterialQueryDto()

    data = new PagingData<SupportMaterial & { count?: number, checked?: boolean, printNumber?:number, currentPrintNum?: number }>()

    checkOptionsOne = [
      // { label: '显示重量', value: 'weight', checked: true },
      // { label: '显示制造商', value: 'manufacturer', checked:true }
    ];

    manufacturerName:any = ''

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
        private supportMaterialService: SupportMaterialService,
        private modal: NzModalService,
        private projectService: ProjectService,
        private msg: NzMessageService,
        private companyService: CompanyService,
        private userService: UserService,
    ) { }

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
          console.log(`开始打印${item.name}`)
          this.printTip = `${item.name}【${item.specification}】 第${i + 1}张 正在打印`
          try {
            printSuccess = await this.printService.printComponentByMat({
              projectShortName: this.project.shortName,
              monomerName: this.monomerName,
              cmptName: item.name,
              cmptSpec: item.specification,
              cmptNum: item.quantity,
              cmptUnit: item.unit,
              cmptMaterial: item.material,
              manufacturerName: this.manufacturerName ? this.manufacturerName : this.company.name,
              qrCode: JSON.stringify({
                id: item.id,
                type: item.type
              })
            })
            console.log(`结束打印${item.name}-${printSuccess}`)
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
          if(l.count <= l.currentPrintNum) {
            l.checked = false
            l.count = 1
            l.currentPrintNum = 0
          }else{
            l.count = l.count - l.currentPrintNum
          }
        })
        this.refreshStatus()
      }
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
        productId: item.id,
        projectId: this.projectId,
        quantity: number,
        manufacturePlanId: undefined
      }
      try {
        let callback = await this.productService.uploadPrintHisByProject([data]);
        if( Number.isInteger(callback) && callback > 0) {
          return true
        } else {
          this.msg.create('error', `${item.name} ${item.specification} 打印记录添加失败`);
          return false
        }
      } catch (error) {
        this.msg.create('error', `${item.name} ${item.specification} 打印记录添加失败，未联网或服务器错误`);
      }
    }
  
    async print() {
        this.getCheckList()
    }

    history(component: any) {
      this.modal.create({
        nzTitle: '打印记录',
        nzContent: ComponentLabelHistoryModalComponent,
        nzComponentParams: {
              productId: component.id
          },
          nzWidth: 800,
          nzFooter: null
      })
    }

    search() {
        this.dto.page = 1
        this.getData()
    }

    async getData() {
      this.isSpinning = true
      try {
        this.data = await this.supportMaterialService.listByValid(this.dto)
        this.data.data.forEach(o => {
          o.count = 1
          o.currentPrintNum = 0
        })
        this.refreshStatus()
      } catch (e) {
          console.log(e)
      } finally {
          this.isSpinning = false
      }
    }

    refreshStatus() {
      const allChecked = this.data.data.every(value => value.checked === true)
      const allUnChecked = this.data.data.every(value => !value.checked)
      this.allChecked = allChecked
      this.indeterminate = (!allChecked) && (!allUnChecked)
    }

    checkAll(value: boolean) {
      if (value) {
          // this.data.data.forEach(data => data.checked = true)
          this.data.data.forEach((val) => {
              if (val.status !== 2) {
                val.checked = true
              }
          })
      } else {
          this.data.data.forEach(data => data.checked = false)
      }
      this.refreshStatus()
    }

    async preview(supportMaterial: SupportMaterial) {
        this.modal.create({
          nzTitle: '查看标签',
            nzContent: SuppoprtMaterialLabelPreviewModalComponent,
            nzComponentParams: {
              labelContent: {
                projectShortName: this.project.shortName,
                monomerName: this.monomerName,
                cmptName: supportMaterial.name,
                cmptSpec: supportMaterial.specification,
                cmptNum: supportMaterial.quantity,
                cmptUnit: supportMaterial.unit,
                cmptMaterial: supportMaterial.material,
                manufacturerName: this.company.name,
                qrCode: JSON.stringify({
                  id: supportMaterial.id,
                  type: supportMaterial.type
                })
              }
            },
            nzWidth: 450,
            nzFooter: null
        })
    }

}
