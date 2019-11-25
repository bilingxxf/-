import { Component, OnInit,Input } from '@angular/core';
import { ProductISListQueryDTO } from '@core/quality-and-security/product-is-list-query-dto'
import { ProductISDetailQueryDTO } from '@core/quality-and-security/product-is-detail-query-dto'
import { QualitySecurityService } from '@core/quality-and-security/quality-security.service'
import { UtilService } from '@core/util/util.service'
import * as moment from 'moment'

@Component({
  selector: 'app-product-ir-page',
  templateUrl: './product-ir-page.component.html',
})
export class ProductIrPageComponent implements OnInit {

    _currentMonomer: any
    @Input() 
    set currentMonomer(val) {
        this._currentMonomer = val;
        this.listQueryDTO.monomerId = val.monomer.id
        this.search()
    }
    get currentMonomer() {
        return this._currentMonomer
    }

    month: any

    isDetailVisible:boolean = false

    isSpinning:boolean = false

    listQueryDTO = new ProductISListQueryDTO()

    detailDTO = new ProductISDetailQueryDTO()

    productIRData = []

    detailData:any = {}

    constructor(
      private qualitySecurityService: QualitySecurityService,
      private utilService: UtilService
    ) { }

    ngOnInit() {
      this.month = new Date()
      this.listQueryDTO.yearAndMonthDate = moment(this.month).format('YYYY-MM')
    }

    /**
     * 根据时间获取检验列表
     *
     * @memberof ProductIrPageComponent
     */
    onDateChange() {
      this.listQueryDTO.yearAndMonthDate = moment(this.month).format('YYYY-MM')
      this.getProductISList()
    }

    /**
     *获取检验列表
     *
     * @memberof ProductIrPageComponent
     * @author duhh
     */
    async getProductISList() {
      this.productIRData = await this.qualitySecurityService.fetchProductISList(this.listQueryDTO)
      console.log('this.productIRData',this.productIRData)
    }

    /**
     *获取检验对象详情
     *
     * @memberof ProductIrPageComponent
     */
    async getProductISDetail() {
      this.isSpinning = true
      try {
        this.detailData = await this.qualitySecurityService.fetchProductISDetail(this.detailDTO) 
      } catch (e) {
          console.log(e)
      } finally {
          this.isSpinning = false
      }
    }

    /**
     *根据构件编号查询
     *
     * @memberof ProductIrPageComponent
     */
    search() {
      this.month = new Date()
      this.listQueryDTO.yearAndMonthDate = moment(this.month).format('YYYY-MM')
      this.listQueryDTO.originSerialNo = this.listQueryDTO.serialNo
      this.getProductISList()
    }

    /**
     * 详情
     * @param {*} item 检验对象
     * @memberof ProductIrPageComponent
     * @author duhh
     */
    openDetail(item) {
      this.detailDTO.startDate = moment(this.month).startOf('month').format('YYYY-MM-DD')
      this.detailDTO.endDate = moment(this.month).endOf('month').format('YYYY-MM-DD')
      this.detailDTO.userId = item.userId
      this.detailDTO.isFinished = item.isFinished
      this.detailDTO.serialNo = this.listQueryDTO.originSerialNo
      this.detailDTO.monomerId = this.listQueryDTO.monomerId
      this.isDetailVisible = true
      this.getProductISDetail()
    }

    /**
     * 导出报表
     * @param {*} item 检验对象
     * @memberof ProductIrPageComponent
     * @author duhh
     */
    exportReport(item) {
      this.detailDTO.startDate = moment(this.month).startOf('month').format('YYYY-MM-DD')
      this.detailDTO.endDate = moment(this.month).endOf('month').format('YYYY-MM-DD')
      this.detailDTO.userId = item.userId
      this.detailDTO.isFinished = item.isFinished
      this.detailDTO.serialNo = this.listQueryDTO.originSerialNo
      this.detailDTO.monomerId = this.listQueryDTO.monomerId
      window.open(`/api/quantity-inspection-records/monomer/export?${this.utilService.objToSearch(this.detailDTO)}`);
    }

    /**
     *弹出modal 确认
     *
     * @memberof ProductIrPageComponent
     * @author duhh
     */
    handleOk(): void {
      this.isDetailVisible = false;
    }
    
    /**
     *弹出modal 取消
     *
     * @memberof ProductIrPageComponent
     * @author duhh
     */
    handleCancel(): void {
      this.isDetailVisible = false;
    }
}
