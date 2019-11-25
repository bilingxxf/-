import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '@core/user/user.service';
import { MaterialDataService } from '../../../../services';
import { MaterialDataQuery } from '../../../../interfaces';
import { MaterailTypes } from '../../../../constant/material-type.enmu';
import { MaterialOutboundType } from '../../../../constant/material-outbound-type.enum';
import { iterateEnum } from '../../../../utils';
import { MaterialDataOutboundOrder, MaterialData, MaterialInboundOrder, MaterialReturnData } from '../../../../models';
import { ProjectService } from '@core/project/project.service'
import { ProjectQueryDto } from '@core/project/project-query-dto'
import { NzMessageService } from 'ng-zorro-antd'


@Component({
  selector: 'app-materials-data',
  providers: [MaterialDataService],
  templateUrl: './materials-data.component.html',
})
export class MaterialsDataComponent implements OnInit {
    @ViewChild('steel') steel: any
    @ViewChild('profile') profile: any
    @ViewChild('color') color: any
    @ViewChild('enclosure') enclosure: any
    @ViewChild('base') base: any
    companyId: number;
    materialDataQuery: MaterialDataQuery = {
      page: 1,
      size: 10,
      formType: 0
    } as any
    materailTypes: any[] = [];
    isVisible = false;
    isReturnModelVisible = false;
    template = this.steel;
    content = this.steel;

    get materialDataState() {
      return this.materialDataService.state
    }
    materialInboundOrder = new MaterialInboundOrder();
    materialDataOutboundOrder = new MaterialDataOutboundOrder();
    materialData = new MaterialData();
    projectQuery = new ProjectQueryDto();
    projects: any[] = []
    materialOutboundTypes: any[] = [];
    materialReturnData = new MaterialReturnData();

    _formType = 0
    get formType() {
      return this._formType
    }

    set formType(val) {
      this._formType = val;
      this.materialDataQuery.formType = val;
      this.materialDataState.materialDataOutboundList$.next([])
      this.materialDataState.materialDataList$.next([]);
      this.materialDataQuery.page = 1;
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
        console.log(this.template);
      }
    }

    constructor(
      private materialDataService: MaterialDataService,
      private userService: UserService,
      private route: ActivatedRoute,
      private projectService: ProjectService,
      private msg: NzMessageService,


    ) { 
      this.materailTypes = iterateEnum(MaterailTypes).map(val => {
        return {
          label: val[0],
          value: val[1]
        }
      })

      this.materialOutboundTypes = iterateEnum(MaterialOutboundType).map(val => {
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
          this.materialDataQuery.companyId = this.companyId = user.department.companyId;
          this.materialInboundOrder.createName = user.name;
          this.materialInboundOrder.companyId = this.companyId;
          this.getMaterialData();
        })
      this.getProjects()
    }

    getMaterialData(next = 1) {
      this.materialDataQuery.page = next;
      this.materialDataService.getMaterialData(this.materialDataQuery).subscribe()
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
      this.materialDataOutboundOrder.formType = this.materialDataQuery.formType;
      this.materialDataService.state.materialDataOutboundList$.getValue().forEach(val => {
        if ((val as any).isComplete) {
          this.materialDataOutboundOrder.allOddment.push(val);
        } else {
          this.materialDataOutboundOrder.remainOddment.push(val);
        }

      })
      this.materialDataService.saveMaterialDataOutboundOrder(this.materialDataOutboundOrder).subscribe(() => {
        this.msg.success('操作成功');
        this.materialDataService.state.materialDataOutboundList$.next([]);
      });
    }

    makeNewReturnOrder(row: MaterialData) {
      this.materialReturnData.companyId = this.companyId
      Object.assign(this.materialReturnData, row);
      this.isReturnModelVisible = true;
    }

    returnMaterialData() {
      this.materialReturnData.createName = this.materialInboundOrder.createName;
      this.materialDataService.returnMaterialData(this.materialReturnData).subscribe(() => {
        this.isReturnModelVisible = false;
        this.materialReturnData = new MaterialReturnData();
        this.msg.success('操作成功');
      })
    }

    closeReturnModel() {
      this.isReturnModelVisible = false;
    }

}
