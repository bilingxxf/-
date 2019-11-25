import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialInboundOrder, MaterialInbound, Supplier } from '../../../../models'
import { iterateEnum } from '../../../../utils';
import { MaterailTypes } from '../../../../constant/material-type.enmu';
import { BehaviorSubject } from 'rxjs';
import { MaterialService, SupplierService, MaterialDataService } from '../../../../services';
import { UserService } from '@core/user/user.service';
import { MaterialKindQuery, MaterialTypeQuery, MaterialVarietyQuery, PageResponse, SupplierQuery, MaterialDataQuery } from '../../../../interfaces'
import { MaterialData, MaterialDataOutboundOrder } from '../../../../models';
import { NzMessageService } from 'ng-zorro-antd'
import { ActivatedRoute } from '@angular/router'
import { ProjectService } from '@core/project/project.service'
import { ProjectQueryDto } from '@core/project/project-query-dto'

@Component({
  selector: 'app-materials-data-detail',
  providers: [MaterialService, SupplierService, MaterialDataService],
  templateUrl: './materials-data-detail.component.html',
})
export class MaterialsDataDetailComponent implements OnInit {
    @ViewChild('steel') steel: any
    @ViewChild('profile') profile: any
    @ViewChild('color') color: any
    @ViewChild('enclosure') enclosure: any
    @ViewChild('base') base: any
    @ViewChild('InboundForm') inboundForm: any
    materialInboundOrder = new MaterialInboundOrder();
    materialInbound = new MaterialInbound();
    materailTypes: any[] = [];
    materialData = new MaterialData();
    materialDataList: MaterialData[] = [];
    materialOutboundList: MaterialData[] = [];
    isVisible = false;
    companyId : number;
    materialDataOutboundOrder = new MaterialDataOutboundOrder();
    user: any = {}
    get material () { return this.materialService.state };
    get materialDataOutboundList() { return this.materialDataService.state.materialDataOutboundList$ }
    type: number = 0
    projects: any[] = []

    template = this.steel
    editModel = false;

    projectQuery = new ProjectQueryDto();

    supplierQuery: SupplierQuery = {} as any;
    get supplierList() {
      return this.supplierService.state.supplierList$.getValue();
    }

    _formType = 0
    get formType() {
      return this._formType
    }

    set formType(val) {
      this._formType = val;
      this.materialInboundOrder.totalPrice = null;
      this.materialInbound = new MaterialInbound();
      switch (val) {
        case 0:
          this.template = this.steel;
          break;
        case 1:
          this.template = this.profile;
          break;
        case 2:
          this.template = this.color;
          break;
        case 3: 
          this.template = this.enclosure;
          break
        case 4:
          this.template = this.base;
          break
        default:
          this.template = this.steel;
      }
    }


    constructor(
      private materialService: MaterialService,
      private userService: UserService,
      private supplierService: SupplierService,
      private materialDataService: MaterialDataService,
      private msg: NzMessageService,
      private route: ActivatedRoute,
      private projectService: ProjectService,
    ) { 
      this.materailTypes = iterateEnum(MaterailTypes).map(val => {
        return {
          label: val[0],
          value: val[1]
        }
      })
    }

    ngOnInit() {
      this.formType = 0;
      this.userService.user
        .filter((val: any) => !!val.id)
        .subscribe((user: any) => {
          this.companyId = user.department.companyId;
          this.materialInboundOrder.companyId = this.companyId;
          this.materialInboundOrder.createName = user.name;
        })

      this.route.queryParams
        .filter((val: any) => !!val.id)
        .subscribe((query) => {
          this.materialDataService.getMaterialDataDetail(query.id).subscribe((res: MaterialData) => {
            this.materialDataList = [res];
          });
        })

      this.getProjects()
    }

    async getProjects() {
      this.projectQuery.size = 1000;
      this.projectQuery.Authorization = localStorage.getItem('building-token');
      const response = await this.projectService.getProjectList(this.projectQuery);
      this.projects = response.data;
    }

    makeNewOutOrder(row: any) {
      this.isVisible = true
      Object.assign(this.materialData, row);
      this.materialData.oddmentId = row.id;
      this.materialData.bomDetailsId = row.bomDetailsId;
    }

    handleCancel() {
      this.isVisible = false;
    }

    handleOk() {
      if (this.materialData.actualLength || this.materialData.actualThickness || this.materialData.actualWeight) {
        (this.materialData as any).isComplete = false;
      } else {
        (this.materialData as any).isComplete = true;
      }
      this.materialData.actualWeight = this.materialData.actualNumber ? 0 : this.materialData.actualWeight;
      this.materialData.actualNumber = this.materialData.actualWeight ? 0 : this.materialData.actualNumber;
      this.materialData.actualLength = this.materialData.actualLength || this.materialData.length;
      this.materialData.actualWidth = this.materialData.actualWidth || this.materialData.width;
      this.materialData.actualThickness = this.materialData.actualThickness || this.materialData.thickness;
      this.materialDataService.addNewMaterialDataOutbound(this.materialData);
      this.materialData = new MaterialData();
      this.isVisible = false;
    }

    remove(row: MaterialData) {
      this.materialDataService.removeMaterialDataOutbound(row)
    }

    save() {
      this.materialDataOutboundOrder.companyId = this.companyId;
      this.materialDataOutboundOrder.createName = this.materialInboundOrder.createName;
      this.materialDataOutboundOrder.formType = this.formType;
      this.materialOutboundList.forEach(val => {
        if ((val as any).isComplete) {
          this.materialDataOutboundOrder.allOddment.push(val);
        } else {
          this.materialDataOutboundOrder.remainOddment.push(val);
        }
      })
      this.materialDataService.saveMaterialDataOutboundOrder(this.materialDataOutboundOrder).subscribe();
    }


}
