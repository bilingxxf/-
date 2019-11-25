import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { PagingData } from '@core/common-entity/paging-data'
import { NzModalService } from 'ng-zorro-antd'
import { ProjectService } from '@core/project/project.service'
import { Enclosure } from '@core/enclosure/enclosure'
import { EnclosureService } from '@core/enclosure/enclosure.service'
import { EnclosureQueryDto } from '@core/enclosure/enclosure-query-dto'
import { EnclosureLabelPreviewModalComponent } from '../../../print-label-page/enclosure-label-preview-modal/enclosure-label-preview-modal.component'
import { CompanyService } from '@core/company/company.service'
import { UserService } from '@core/user/user.service'
import { ProductStatus } from '../../../../../constant/product.status.enum';
import { ComponentColors } from '../../../../../constant/component-colors.enum';

@Component({
  selector: 'app-product-label-encl',
  templateUrl: './product-label-encl.component.html',
})
export class ProductLabelEnclComponent implements OnInit {

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

    @Input() projectId: number

    @Input() monomerName: string

    allChecked = false

    indeterminate = false

    dto = new EnclosureQueryDto()

    data = new PagingData<Enclosure & { count?: number, checked?: boolean }>()

    productStatus = ProductStatus;

    ComponentColors= ComponentColors;

    isSpinning:boolean = false

    constructor(
        private enclosureService: EnclosureService,
        private modal: NzModalService,
        private projectService: ProjectService,
        private companyService: CompanyService,
        private userService: UserService
    ) { }

    

    search() {
        this.dto.page = 1
        this.getData()
    }

    ngOnInit() {
    }

    async getData() {
        this.isSpinning = true
        try {
            this.data = await this.enclosureService.listByValid(this.dto)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
      }

    async preview(enclosure: Enclosure) {
        const project = await this.projectService.getProjectInfoDetail(this.projectId)
        const compamyId = (await this.userService.getCurrentUserInfo()).companyId
        const companyName = (await this.companyService.f(compamyId)).name
        this.modal.create({
          nzTitle: '查看标签',
            nzContent: EnclosureLabelPreviewModalComponent,
            nzComponentParams: {
              labelContent: {
                projectShortName: project.shortName,
                monomerName: this.monomerName,
                cmptName: enclosure.name,
                cmptSpec: enclosure.modelNum,
                cmptNum: enclosure.quantity,
                cmptLength: enclosure.length,
                applicationArea: enclosure.useArea,
                cmptColor: enclosure.color,
                manufacturerName: companyName,
                qrCode: JSON.stringify({
                  id: enclosure.id,
                  type: enclosure.type
                })
              }
            },
            nzWidth: 450,
            nzFooter: null
        })
    }

}
