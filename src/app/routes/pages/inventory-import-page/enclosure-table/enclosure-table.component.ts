import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { EnclosureQueryDto } from '@core/enclosure/enclosure-query-dto'
import { Enclosure } from '@core/enclosure/enclosure'
import { PagingData } from '@core/common-entity/paging-data'
import { EnclosureService } from '@core/enclosure/enclosure.service'
import { EnclosureSummary } from '../../../../core/enclosure/enclosure-summary'
import { ProductStatus } from '../../../../constant/product.status.enum';
import { NzMessageService, NzNotificationService, UploadChangeParam } from 'ng-zorro-antd'
import { ProductService } from '../../../../core/product/product.service'
import { UserService } from '@core/user/user.service';
import { LogDTO } from '@core/user/log-dto';
import { LogTypes } from '../../../../constant/log-types.enum';
import { ActivatedRoute } from '@angular/router'
import { AreaDivision } from '@core/plan/area-division'
import { RecordListDto } from '../../../../core/product/record-list-dto'
import { SupportMaterialTableComponent } from '../support-material-table/support-material-table.component'
import { ComponentColors } from '../../../../constant/component-colors.enum';
import { UtilService } from '@core/util/util.service'

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-enclosure-table',
  templateUrl: './enclosure-table.component.html',
})
export class EnclosureTableComponent implements OnInit {
  _monomerId: number
  @Input()
  set monomerId(val) {
    this._monomerId = val;
    this.getData()
  }
  get monomerId() {
    return this._monomerId
  }

  _area = new AreaDivision()
  @Input()
  set area(val) {
    if (val) {
      this._area = val;
      // console.log(this._area, '围护的区域------')
      this.dto.areaDivisionId = val.id;
      this.dto.page = 1
      this.dtoRecord.page = 1
      this.dtoRecord.monomerId = val.monomerId
      this.dtoRecord.type = val.type
      this.getData()
    }
  }

  get area() {
    return this._area
  }
  summary = new EnclosureSummary()
  headers = {
    Authorization: `cat ${localStorage.getItem('building-token')}`
  }
  dto = new EnclosureQueryDto()
  dtoRecord = new RecordListDto
  data = new PagingData<Enclosure>()
  type: number

  isVisible = false
  productForm: FormGroup
  ProductStatus = ProductStatus;
  ComponentColors = ComponentColors;
  _allChecked = false;
  _indeterminate = false;
  isClearVisible = false;
  reason = '';
  projectId: number
  isSpinning:boolean = false
  constructor(
    private enclosureService: EnclosureService,
    private productService: ProductService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private userService: UserService,
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
    const response = await this.productService.cleaContain(this.monomerId, this.reason);

    this.isClearVisible = false;
    this.dto.page = 1;
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

  search() {
    // this.dto.name = value
    this.dto.page = 1
    this.getData()
  }

  async removeAll() {
    const ids = this.data.data.filter(val => (val as any).checked).map(val => val.id);
    const response = await this.productService.removeAll(ids);
    this.dto.page = 1;
    this.getData()
  }

  async ngOnInit() {
    // this.getData()
    this.route.params.subscribe(({ id }) => this.projectId = id);

    this.productForm = this.fb.group({
      id: [null],
      name: [null],
      color: [null],
      thickness: [null],
      modelNum: [null],
      width: [null],
      length: [null],
      quantity: [null],
      totalMeter: [null],
      surfaceArea: [null],
    })
    this.dtoRecord.monomerId = this.monomerId
    this.dtoRecord.type = this.type

  }

  async getData() {
    this.isSpinning = true
    try {
      this.dto.monomerId = this.monomerId
      // console.log(this.dtoRecord,'tab----')
      if ((!this.dtoRecord.type&& this.dtoRecord.type!=0) || this.dtoRecord.type == 4) {
        // console.log('维护数据')
        this.data = await this.enclosureService.list(this.dto)
        this.summary = await this.enclosureService.getSummaryByMonomerId(this.monomerId)
      } else {
        // console.log('记录数据-')
        this.dtoRecord.type = this.dtoRecord.type == 0 ? 2 : 3
        this.data = await this.enclosureService.recordList(this.dtoRecord)
       
      }    
    } catch (e) {
        console.log(e)
    } finally {
        this.isSpinning = false
    }
  }

  async uploadComponentChange(e: UploadChangeParam, table: EnclosureTableComponent | SupportMaterialTableComponent | EnclosureTableComponent) {
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

  cancel() {
    this.isVisible = false;
    this.productForm.reset({});
  }

  async openEditForm(row: Enclosure) {
    await this.showAlert();
    this.productForm.reset(row);
    this.isVisible = true
  }

  async submit() {
    const row = this.productForm.value
    row.description = this.reason
    try {
      await this.addLog()
      const item = this.data.data.find(val => val.id === row.id);
      const response = await this.productService.updateContainment(row.id, Object.assign(item, row));
      // this.msg.success('操作成功');
      if (item) {
        Object.assign(item, row);
      }

      // this.updateProductStatus(item, 1);
      this.isVisible = false;
      this.getData()
    } catch (e) {
      console.log(e);
    }
  }

  recordDownExcel() {
    let monomerId = this._area.monomerId
    let type = this._area.type == 0 ? 2 : 3
    window.open(`/api/product-modify/history/export?${this.utilService.objToSearch({monomerId,type})}`);
  }

  async removeProducts(row: Enclosure) {
    try {
      const response = await this.productService.containRemoveDel(row.id);
      this.msg.success('操作成功');
      const index = this.data.data.findIndex(val => val.id === row.id);
      if (index > -1) {
        this.data.data.splice(index, 1);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async updateProductStatus(row: Enclosure, status: number) {
    try {
      const response = await this.productService.updateProductStatus(row.id, status);
      if (status == 1) {
        row.status = row.lastStatus;
      } else {
        row.status = status;
      }
    } catch (e) {
      console.log(e);
    }
  }

  /** 供父组件调用 */
  async reset() {
    this.search()
    // this.search('')
    // this.summary = await this.enclosureService.getSummaryByMonomerId(this.monomerId)
  }

  async showAlert() {
    let { value: reason } = await this.userService.showAlert();
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
    await this.userService.addLog(query);
  }
}
