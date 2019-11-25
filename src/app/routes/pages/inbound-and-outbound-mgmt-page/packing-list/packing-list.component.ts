import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { PackingListService } from '@core/packing-list/packing-list.service'
import { PackingListDTO } from '@core/packing-list/packing-list-dto'
import { getLodop } from '../../../../../static/LodopFuncs.js';
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { CompanyService } from '../../../../core/company/company.service'
import { UserService } from '../../../../core/user/user.service'
import { ProjectService } from '@core/project/project.service'
import { ProductService } from '../../../../core/product/product.service'
import { PrintService } from '@core/print/print.service'
import { UtilService } from '@core/util/util.service'
import { PackingLabelPreviewModalComponent } from './packing-label-preview-modal/packing-label-preview-modal.component'
import * as moment from 'moment'

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
})
export class PackingListComponent implements OnInit {

    // 打包清单列表
    tableData: any = {}

    // 打包构件列表
    packDetailData: any = {}

    // 详情表格过度动画
    isDetailSpinning: Boolean = false

    isSpinning:boolean = false

    packListDTO = new PackingListDTO

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {   
      if(val){
        this._currentMonomer = val;
        this.packListDTO.monomerId = val.id;
        this.getPackingList(true)
      }        
    }
    
    get currentMonomer() {              
      return this._currentMonomer
    }

    // 日期查询
    searchDate:Date = new Date()

    isPackingDetailDlgVisible:Boolean = false

    currentPack:any = {}

    isPrintSpinning:Boolean = false

    project:any = {}

    company:any = {}

    constructor(
        private packingListService:PackingListService,
        private printService: PrintService,
        private msg: NzMessageService,
        private companyService: CompanyService,
        private userService: UserService,
        private projectService: ProjectService,
        private productService: ProductService,
        private utilService: UtilService,
        private modal: NzModalService
    ) { }

    async ngOnInit() {
      this.searchDate = new Date()
      this.packListDTO.month = moment(this.searchDate).format('YYYY-MM')
      this.project = await this.projectService.getProjectInfoDetail(this.currentMonomer.projectId)
      const compamyId = (await this.userService.getCurrentUserInfo()).companyId
      this.company = (await this.companyService.f(compamyId))
    }

    /**
     * 获取打包清单
     */
    async getPackingList(reset:boolean = false) {
      if(reset) {
        this.packListDTO.page = 1
      }
      this.packListDTO.month = moment(this.searchDate).format('YYYY-MM')
      this.isSpinning = true
      try {
        let packingListData = await this.packingListService.fetchPackingList(this.packListDTO)
        this.tableData = packingListData
        if(this.tableData && this.tableData.data && this.tableData.data.length > 0){
          this.currentPack = this.tableData.data[0]
        } 
      } catch (e) {
          console.log(e)
      } finally {
          this.isSpinning = false
      }
    }

    /**
     * 修改日期
     */
    changeDate() {
      this.getPackingList(true)
    }

    /**
     * 获取打包详情
     */
    async getPackDetail() {
      this.isDetailSpinning = true
      let packingListData = await this.packingListService.fetchPackDetail({id:this.currentPack.id})
      this.packDetailData = packingListData
      // console.log('packingListData ------------------->',packingListData);
      this.isDetailSpinning = false
    }

    exportExcelPackDetail(item) {
      const packingId = item.id
      window.open(`/api/productBag/${packingId}/actions/export`);
    }

    /**
     * 查看打包详情
     */
    showPackDetail(currentItem) {
      this.isPackingDetailDlgVisible = true
      this.currentPack = currentItem
      this.getPackDetail()
    }

    /**
     * 详情弹窗-确认
     */
    handleOk() {
      this.isPackingDetailDlgVisible = false
    }

    /**
     * 详情弹窗-取消
     */
    handleCancel() {
      this.isPackingDetailDlgVisible = false
    }

    async previewLabel(item) {
      this.modal.create({
        nzTitle: '查看标签',
        nzContent: PackingLabelPreviewModalComponent,
        nzComponentParams: {
              labelContent: { 
                hasLogo: false,
                // logoSrc: '../../../../../assets/img/logo.png',
                projectShortName: this.project.shortName,
                monomerName: this.currentMonomer.name,
                packNo: item.bagSerial,
                // packWeight: this.checkOptionsOne[0].checked ? val.pieceWeight : '',
                packWeight: item.countResponseVO && item.countResponseVO.theoreticalWeight ? item.countResponseVO.theoreticalWeight : 0,
                packNumber: item.countResponseVO && item.countResponseVO.number ? item.countResponseVO.number : 0,
                // manufacturerName: this.manufacturerName ? this.manufacturerName : companyName,
                manufacturerName: this.company.name,
                qrCode: JSON.stringify({
                  id: item.id,
                  type: 4 // 包
                })
              },
              // monomerName: 
          },
          nzWidth: 400,
          nzFooter: null
      })
    }
    
    async printLabel(item) {
        this.getCheckList(item)
    }

    // 打印
    async getCheckList(item) {
      this.isPrintSpinning = true
      let printSuccess = await this.printService.printPacking({
        projectShortName: this.project.shortName,
        monomerName: this.currentMonomer.name,
        packNo: item.bagSerial,
        // packWeight: this.checkOptionsOne[0].checked ? val.pieceWeight : '',
        packWeight: item.countResponseVO && item.countResponseVO.theoreticalWeight ? item.countResponseVO.theoreticalWeight : 0,
        packNumber: item.countResponseVO && item.countResponseVO.number ? item.countResponseVO.number : 0,
        // manufacturerName: this.manufacturerName ? this.manufacturerName : companyName,
        manufacturerName: this.company.name,
        qrCode: JSON.stringify({
          id: item.id,
          type: 4 // 包
        })
      })
      console.log('printSuccess------------------',printSuccess)
      if(!printSuccess) {
        this.msg.create('error', '打印失败，已清空打印机打印队列，请重新打印');
      }
      this.isPrintSpinning = false
    }

}
