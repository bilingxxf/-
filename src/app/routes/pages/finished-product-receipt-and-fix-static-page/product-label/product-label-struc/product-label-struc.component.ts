import { Component, OnInit, Input } from '@angular/core'
import { ProductService } from '@core/product/product.service'
import { PagingData } from '@core/common-entity/paging-data'
import { ComponentQueryDto } from '@core/product/component-query-dto'
import { ProductComponent } from '@core/product/product-component'
import { NzModalService } from 'ng-zorro-antd'
import { ComponentLabelPreviewModalComponent } from '../../../print-label-page/component-label-preview-modal/component-label-preview-modal.component'
import { ProjectService } from '@core/project/project.service'
import { UserService } from '@core/user/user.service'
import { CompanyService } from '@core/company/company.service'
import { ProductStatus } from '../../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../../constant/component-colors.enum';


@Component({
  selector: 'app-product-label-struc',
  templateUrl: './product-label-struc.component.html',
})
export class ProductLabelStrucComponent implements OnInit {

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

  @Input() areaName: string

  @Input() projectId: number

  @Input() monomerName: string

  dto = new ComponentQueryDto()

  data = new PagingData<any & { count?: number, checked?: boolean }>()
  productStatus = ProductStatus;

  ComponentColors= ComponentColors;

  isSpinning:boolean = false

  constructor( 
      private productService: ProductService,
      private modal: NzModalService,
      private projectService: ProjectService,
      private userService: UserService,
      private companyService: CompanyService

  ) { }

  log(value: object[]): void {
    console.log(value);
  }

  search() {
      this.dto.page = 1
      this.getData()
  }

  ngOnInit() {
  }

  async getData() {
      this.isSpinning = true
      try {
        this.dto.areaDivisionId = this.areaId
        if(this.dto.areaDivisionId){
          this.data = await this.productService.strucListByArea(this.dto)
        }
      } catch (e) {
          console.log(e)
      } finally {
          this.isSpinning = false
      }
  }

  async preview(component: ProductComponent) {
      const project = await this.projectService.getProjectInfoDetail(this.projectId)
      const compamyId = (await this.userService.getCurrentUserInfo()).companyId
      const companyName = (await this.companyService.f(compamyId)).name
      this.modal.create({
        nzTitle: '查看标签',
        nzContent: ComponentLabelPreviewModalComponent,
        nzComponentParams: {
          labelContent: {
            projectShortName: project.shortName,
            monomerName: this.monomerName,
            cmptArea: this.areaName,
            cmptName: component.name,
            cmptNo: component.serialNo,
            cmptSpec: component.specification,
            cmptNum: component.quantity,
            cmptLength: component.length,
            cmptWeight: component.pieceWeight,
            manufacturerName: companyName,
            qrCode: JSON.stringify({
              id: component.id,
              type: component.type
            })
          }
        },
        nzWidth: 600,
        nzFooter: null
      })
  }

}
