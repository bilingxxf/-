import { Component, OnInit, Input } from '@angular/core'
import { ProductService } from '../../../../core/product/product.service'
import { ProductComponent } from '@core/product/product-component'
import { PagingData } from '@core/common-entity/paging-data'
import { RecordListDto } from '../../../../core/product/record-list-dto'
import { AreaDivision } from '@core/plan/area-division'
import { AreaComponentSummaryItem } from '../../../../core/product/area-component-summary-item'
import { NzMessageService, NzNotificationService, UploadChangeParam } from 'ng-zorro-antd'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { Colors } from '../../../../constant/colors.enum';
import { UserService } from '@core/user/user.service';
import { LogDTO } from '@core/user/log-dto';
import { LogTypes} from '../../../../constant/log-types.enum';
import { ActivatedRoute } from '@angular/router'
import { EnclosureTableComponent } from '../enclosure-table/enclosure-table.component'
import { SupportMaterialTableComponent } from '../support-material-table/support-material-table.component'
import { UtilService } from '@core/util/util.service'

import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
  } from '@angular/forms';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  
})
export class RecordTableComponent implements OnInit {
    _area = new AreaDivision()
    @Input()
    monomerId: number;
    type: number
    productForm:FormGroup
    @Input()
    set area(val) {
        if (val) {
            this._area = val;
            // console.log(val,'ballll=====')
            this.dto.monomerId = val.monomerId
            this.dto.type = val.type
            // this.dto.areaDivisionId = val.id;
            this.dto.page = 1
            this.getData()
        }
    }

    get area() {
        return this._area
    }

    

    // descForm: Form

    summary = new AreaComponentSummaryItem()

    dto = new RecordListDto
	
	headers = {
        Authorization: `cat ${localStorage.getItem('building-token')}`
    }
	
    data = new PagingData<ProductComponent>()

    ProductStatus = ProductStatus;
    isVisible = false;
    _allChecked = false;
    _indeterminate = false;
    isClearVisible = false;
    Colors = Colors;
    reason = '';
    projectId: number
    constructor(
        private productService: ProductService,
        private fb: FormBuilder,
        private userService: UserService,
        private msg: NzMessageService,
        private route: ActivatedRoute,
        private notification: NzNotificationService,
        private utilService: UtilService
    ) { }

    async beforeClear() {
      // this.isClearVisible = true
       await this.showAlert();
       await this.addLog()
       await this.onClear()
    }
    onCancel() {
      this.isClearVisible = false;
    }

    async onClear() {
      const response = await this.productService.clear(this.monomerId, this._area.id, this.reason);
      this.isClearVisible = false;
      this.dto.page = 1;
      this.getData()
    }
    
    async uploadComponentChange(e: UploadChangeParam, table: RecordTableComponent | SupportMaterialTableComponent | EnclosureTableComponent) {
        if (e.file.status !== 'done') return
        const response = e.file.response
        if (response.code >= 400) return this.msg.error(response.message)

        // 先直接通过
        await this.productService.importConfirm(response.data, true)
//      this.setSummary()
        table.reset()

        this.notification.success('导入成功', '')
        this.getData()
    }

    search(value: string) {
        // this.dto.serialNo = value
        this.dto.page = 1
        this.getData()
    }
    _checkAll(val) {
      if (val) {
        this.data.data.forEach(val => {
          (val as any).checked = true;
        })
      } else {
        this.data.data.forEach(val => {
          (val as any).checked = false;
        })
      }
    }
    _refreshStatus() {
      const _allChecked = this.data.data.every(value => (value as any).checked === true);
      const _allUnchecked = this.data.data.every(value => !(value as any).checked);
      this._indeterminate = (!_allChecked) && (!_allUnchecked);
      this._allChecked = _allChecked;
    }
    


    ngOnInit() {
      this.productForm = this.fb.group({
        id             : [null],
        name           : [null],
        figureNo       : [null],
        // serialNo       : [null],
        specification  : [null],
        length         : [null],
        material       : [null],
        quantity       : [null],
        pieceWeight    : [null],
        totalWeight    : [null],
        surfaceArea    : [null]
      })
      this.dto.monomerId = this.monomerId
      this.dto.type = this.type
      this.route.params.subscribe(({ id }) => this.projectId = id);
    }

    async getData() {
      this.data = await this.productService.recordList(this.dto)
      // console.log(this.data.data)
    }

    recordDownExcel() {
      let monomerId = this._area.monomerId
      let type = this._area.type
      window.open(`/api/product-modify/history/export?${this.utilService.objToSearch({monomerId,type})}`);
  }

    async openEditForm(row: ProductComponent) {
      await this.showAlert();
      this.productForm.reset(row);
      this.isVisible = true
    }

    async removeAll() {
      const ids = this.data.data.filter(val => (val as any).checked).map(val => val.id);
      const response = await this.productService.removeAll(ids);
      this.dto.page = 1;
      this.getData()
    }

    async submit() {

      const row = this.productForm.value
      row.description = this.reason
      try {
        await this.addLog();
        const response = await this.productService.updateStructures(row.id, row);
        const item = this.data.data.find(val => val.id === row.id);
        if (item) {
          Object.assign(item, row);
          // this.updateProductStatus(item, 1);
        }
        this.isVisible = false;
      } catch (e) {
        console.log(e);
      }
    }

    cancel() {
      this.isVisible = false;
      this.productForm.reset({});
    }

    async removeProducts(row: ProductComponent) {
        try {
            const response = await this.productService.removeProducts(row.id);
            // this.msg.success('操作成功');
            const index = this.data.data.findIndex(val => val.id === row.id);
            if (index > -1) {
                this.data.data.splice(index, 1);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateProductStatus(row: ProductComponent, status: number) {
        try {
            const response = await this.productService.updateProductStatus(row.id, status);
            // this.msg.success('操作成功');
            row.status = status;
        } catch (e) {
            console.log(e);
        }
    }

    
    /** 供父组件调用 */
    reset() {
        this.search('')
    }

    async showAlert() {
      let {value: reason} = await this.userService.showAlert();
      if (!reason) {
        this.msg.error('请输入执行原因');
        throw new Error('请输入执行原因');
      }
      this.reason = reason;
    }

    async addLog() {
      const query = new LogDTO();
      query.projectId = this.projectId;
      query.type = LogTypes.技术修改记录;
      query.description = this.reason;
      await this.userService.addLog(query)
    }

}
