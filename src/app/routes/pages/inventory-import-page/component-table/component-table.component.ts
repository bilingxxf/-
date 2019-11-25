import { Component, OnInit, Input, ɵConsole } from '@angular/core'
import { ProductService } from '../../../../core/product/product.service'
import { ProductComponent } from '@core/product/product-component'
import { PagingData } from '@core/common-entity/paging-data'
import { ComponentQueryDto } from '../../../../core/product/component-query-dto'
import { AreaDivision } from '@core/plan/area-division'
import { AreaComponentSummaryItem } from '../../../../core/product/area-component-summary-item'
import { NzMessageService, NzNotificationService, UploadChangeParam } from 'ng-zorro-antd'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../constant/component-colors.enum';
import { UserService } from '@core/user/user.service';
import { LogDTO } from '@core/user/log-dto';
import { LogTypes} from '../../../../constant/log-types.enum';
import { ActivatedRoute } from '@angular/router'
import { EnclosureTableComponent } from '../enclosure-table/enclosure-table.component'
import { SupportMaterialTableComponent } from '../support-material-table/support-material-table.component'
import { UtilService } from '@core/util/util.service'
import { RecordListDto } from '../../../../core/product/record-list-dto'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '@core/monomer/monomer.service'
import { ProjectService } from '@core/project/project.service'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-component-table',
  templateUrl: './component-table.component.html'
})
export class ComponentTableComponent implements OnInit {
    _area = new AreaDivision()
    @Input()
    monomerId: number;
    type: number
    productForm:FormGroup
    delId: number
    @Input()
    set area(val) {
        if (val) {
            this._area = val;
            this.dto.areaDivisionId = val.id;
            this.dto.page = 1
            this.dtoRecord.monomerId = val.monomerId
            this.dtoRecord.type = val.type
            // console.log(this.dtoRecord.type,'测试111')
            this.getData()
        }
    }

    get area() {
        return this._area
    }

    colorMsg:object = {}

    // descForm: Form

    summary = new AreaComponentSummaryItem()

    dto = new ComponentQueryDto
    dtoRecord = new RecordListDto
	  headers = {
        Authorization: `cat ${localStorage.getItem('building-token')}`
    }
	
    data = new PagingData<ProductComponent>()

    ProductStatus = ProductStatus;
    ComponentColors = ComponentColors;
    isVisible = false;
    isDeleteVisible = false
    _allChecked = false;
    _indeterminate = false;
    isClearVisible = false;
    
    reason = '';
    projectId: number
    isSpinning:boolean = false
    constructor(
        private productService: ProductService,
        private fb: FormBuilder,
        private userService: UserService,
        private msg: NzMessageService,
        private route: ActivatedRoute,
        private notification: NzNotificationService,
        private utilService: UtilService,
        private projectService: ProjectService,
        private monomerService: MonomerService,
    ) { }

    async beforeClear() {
      // this.isClearVisible = true
       await this.showAlert();
       await this.addLog()
       await this.onClear()
    }
    onCancel() {
      this.isClearVisible = false;
      this.isDeleteVisible = false
    }

    async onClear() {
      const response = await this.productService.clear(this.monomerId, this._area.id, this.reason);
      this.isClearVisible = false;
      this.dto.page = 1;
      this.getData()
    }
    
    async uploadComponentChange(e: UploadChangeParam, table: ComponentTableComponent | SupportMaterialTableComponent | EnclosureTableComponent) {
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

    search() {
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
        serialNo       : [{value: '', disabled: true}],
        specification  : [null],
        length         : [null],
        material       : [null],
        quantity       : [null],
        pieceWeight    : [null],
        totalWeight    : [{value: '', disabled: true}],
        surfaceArea    : [null]
      })
      this.dtoRecord.monomerId = this.monomerId
      this.dtoRecord.type = this.type
      this.route.params.subscribe(({ id }) => this.projectId = id);
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
        }
        this.isVisible = false;
        this.getData()
      } catch (e) {
        console.log(e);
      }
    }

    cancel() {
      this.isVisible = false;
      this.isDeleteVisible = false
      this.productForm.reset({});
    }

    async removeProducts(row: ProductComponent) {
        try {
            // const response = await this.productService.removeProducts(row.id);
            // // this.msg.success('操作成功');
            // const index = this.data.data.findIndex(val => val.id === row.id);
            // if (index > -1) {
            //     this.data.data.splice(index, 1);
            // }
            this.delId = row.id
            this.isDeleteVisible = true
            console.log(row, '删除后-----------')
        } catch (e) {
            console.log(e);
        }
    }

    async onDelete() {
      const query = new LogDTO();
      query.description = this.productForm.value.name;
      const response = await this.productService.deleteStructures(this.delId, query.description);
      this.isDeleteVisible = false;
      this.dto.page = 1;
      this.getData()
    }

    async updateProductStatus(row: ProductComponent, status: number) {
      console.log(row,'row---------')
      // row.lastStatus = row.status
        try {
            const response = await this.productService.updateProductStatus(row.id, status);
            // this.msg.success('操作成功');
            if(status == 1){
              row.status = row.lastStatus;
            }else{
              row.status = status;
              // console.log(row.status,'laststutu2', row.lastStatus)
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    async getData() {
      this.isSpinning = true
      try {
        if(this.dtoRecord.type==1 || this.dtoRecord.type==0) {
          this.data = await this.productService.recordList(this.dtoRecord)
        }else {
          this.data = await this.productService.listComponent(this.dto)
        }
      } catch (e) {
          console.log(e)
      } finally {
          this.isSpinning = false
      }
    }
    recordDownExcel() {
      let monomerId = this._area.monomerId
      let type = this._area.type
      window.open(`/api/product-modify/history/export?${this.utilService.objToSearch({monomerId,type})}`);
  }
    /** 供父组件调用 */
    reset() {
        // this.search('')
        this.search()
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

    /**
     * 导入操作
     *
     * @param e
     * @param table
     */
    async uploadChange(e: UploadChangeParam, monomerId) {
      if (e.file.status !== 'done') return
      const response = e.file.response
      if (!response.success) return this.msg.error('导入失败')
      const fileName = response.saveName
      if (!await this.projectService.checkModelNameIsUnique(fileName)) return this.msg.error('文件名重复')
      const uploadResult = await this.projectService.uploadModel(monomerId, fileName)
      if (!uploadResult.success) return this.msg.error('导入失败')
      try {
          await this.monomerService.updateModel(monomerId, uploadResult.projectId)
          this.msg.success('导入成功')
      } catch (e) {
          this.msg.error(e.error.message)
      }
  }
}
