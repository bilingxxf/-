import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { SupportMaterialQueryDto } from '@core/support-material/support-material-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { SupportMaterial } from '@core/support-material/support-material'
import { NzModalService } from 'ng-zorro-antd'
import { ProjectService } from '@core/project/project.service'
import { SupportMaterialService } from '@core/support-material/support-material.service'
import { SuppoprtMaterialLabelPreviewModalComponent } from '../../../print-label-page/suppoprt-material-label-preview-modal/suppoprt-material-label-preview-modal.component'
import { CompanyService } from '@core/company/company.service'
import { UserService } from '@core/user/user.service'

@Component({
  selector: 'app-product-label-mat',
  templateUrl: './product-label-mat.component.html',
})
export class ProductLabelMatComponent implements OnInit {

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

  allChecked = false

  indeterminate = false

  dto = new SupportMaterialQueryDto()

  data = new PagingData<SupportMaterial & { count?: number, checked?: boolean }>()

  isSpinning:boolean = false
  
  constructor(
      private supportMaterialService: SupportMaterialService,
      private modal: NzModalService,
      private projectService: ProjectService,
      private companyService: CompanyService,
      private userService: UserService,
  ) { }

  ngOnInit() {
  }
  

  search() {
      this.dto.page = 1
      this.getData()
  }

  async getData() {
      this.isSpinning = true
      try {
          this.data = await this.supportMaterialService.listByValid(this.dto)
      } catch (e) {
          console.log(e)
      } finally {
          this.isSpinning = false
      }
  }

  async preview(supportMaterial: SupportMaterial) {
      const project = await this.projectService.getProjectInfoDetail(this.projectId)
      const compamyId = (await this.userService.getCurrentUserInfo()).companyId
      const companyName = (await this.companyService.f(compamyId)).name
      this.modal.create({
        nzTitle: '查看标签',
          nzContent: SuppoprtMaterialLabelPreviewModalComponent,
          nzComponentParams: {
            labelContent: {
              projectShortName: project.shortName,
              monomerName: this.monomerName,
              cmptName: supportMaterial.name,
              cmptSpec: supportMaterial.specification,
              cmptNum: supportMaterial.quantity,
              cmptUnit: supportMaterial.unit,
              cmptMaterial: supportMaterial.material,
              manufacturerName: companyName,
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
