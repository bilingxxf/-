import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MaterialInboundOrder, MaterialInbound, Supplier } from '../../../../models'
import { iterateEnum } from '../../../../utils';
import { MaterailTypes } from '../../../../constant/material-type.enmu';
import { BehaviorSubject } from 'rxjs';
import { MaterialService, SupplierService, MaterialDataService } from '../../../../services';
import { UserService } from '@core/user/user.service';
import { MaterialKindQuery, MaterialTypeQuery, MaterialVarietyQuery, PageResponse, SupplierQuery } from '../../../../interfaces'
import { MaterialType, MaterialKind, MaterialVariety } from '../../../../models';
import { NzMessageService } from 'ng-zorro-antd'
import { ActivatedRoute } from '@angular/router'




@Component({
  selector: 'app-materials-add-inbound',
  templateUrl: './materials-add-inbound.component.html',
  providers: [MaterialService, SupplierService, MaterialDataService]
})
export class MaterialsAddInboundComponent implements OnInit {
    @ViewChild('steel') steel: any
    @ViewChild('profile') profile: any
    @ViewChild('color') color: any
    @ViewChild('enclosure') enclosure: any
    @ViewChild('base') base: any
    @ViewChild('InboundForm') inboundForm: any
    materialInboundOrder = new MaterialInboundOrder();
    // get materialInboundOrder() {
    //   return this.materialDataService.state.currentMaterialInboundOrder$.getValue()
    // }
    materialInbound = new MaterialInbound();
    materailTypes: any[] = [];
    isVisible = false;
    companyId : number;
    materialInboundList = new BehaviorSubject<MaterialInbound[]>([]);
    user: any = {}
    get material () { return this.materialService.state };

    treeNode = []
    template = this.steel
    editModel = false;
    createName: string = ''

    materialTypeQuery: MaterialTypeQuery = {} as any;
    materialKindQuery: MaterialKindQuery = {} as any;
    materialVarietyQuery: MaterialVarietyQuery = {} as any;
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
      this.materialInboundList.next([]);
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
      private cdr: ChangeDetectorRef,
      private materialService: MaterialService,
      private userService: UserService,
      private supplierService: SupplierService,
      private materialDataService: MaterialDataService,
      private msg: NzMessageService,
      private route: ActivatedRoute,
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
          this.materialInboundOrder.createName = this.createName = user.name;
          this.getMaterialTypeList();
          this.getSupplierList();
        })

      this.route.queryParams
        .filter((val: any) => !!val.id)
        .subscribe((query) => {
          this.materialDataService.getInboundOrderDetail(query.id).subscribe();
        })

      this.materialDataService.state.currentMaterialInboundOrder$.subscribe(res => {
        this.materialInboundOrder = res;
        this.materialInboundList.next(res.requestVOList || []);
      })
    }

    getSupplierList() {
      this.supplierQuery = {
        page: 1,
        size: 100,
        companyId: this.companyId
      }
      this.supplierService.getSupplierList(this.supplierQuery).subscribe();
    }

    getMaterialTypeList() {
      this.materialTypeQuery = {
        page: 1,
        size: 100,
        companyId: this.companyId
      }
      this.materialService.getMaterialTypeList(this.materialTypeQuery).subscribe((res: PageResponse<MaterialType>) => {
        this.treeNode = res.data.map(val => {
          return new MaterialType(val).transToTreeNode();
        })
      });
    }

    getMaterialVarietyList(typeId: number) {
      this.materialVarietyQuery = {
        page: 1,
        size: 100,
        companyId: this.companyId,
        typeId
      }
      let _materialType = this.material.materialTypeList$.getValue().find(val => val.id === typeId);
      if (_materialType.children.length) return;
      return this.materialService.getMaterialVarietyList(this.materialVarietyQuery);
    }

    getMaterialKindList(varietiesId: number) {
      this.materialKindQuery = {
        page: 1,
        size: 100,
        companyId: this.companyId,
        varietiesId
      }
      let _materialVariety = this.material.materialVarietyList$.getValue().find(val => val.id === varietiesId);
      if (_materialVariety.children.length) return
      return this.materialService.getMaterialKindList(this.materialKindQuery);
    }

    getChildren(event) {
      let _data: MaterialType | MaterialVariety | MaterialKind = event.option.__source__;
      switch (_data.level) {
        case 1:
          this.getMaterialVarietyList((_data as MaterialType).id).subscribe((res: PageResponse<MaterialVariety>) => {
            event.resolve(res.data.map(val => new MaterialVariety(val).transToTreeNode()))              
          })
          break;
        case 2:
          this.getMaterialKindList((_data as MaterialVariety).id).subscribe((res: PageResponse<MaterialKind>) => {
            event.resolve(res.data.map(val => new MaterialKind(val).transToTreeNode()))
          })
          break;
      }
    }

    addMaterialData() {
      this.isVisible = true
    }

    handleCancel() {
      this.isVisible = false;
    }

    remove(index?) {
      if (index || index === 0) {
        let _materialInboundList = this.materialInboundList.getValue();
        _materialInboundList.splice(index, 1)
        this.materialInboundList.next(
          _materialInboundList
        );
      } else {
        this.materialInboundList.next([])
      }
    }

    edit(index) {
      let _materialInbound = this.materialInboundList.getValue()[index];
      this.materialInbound = _materialInbound;
      this.materialInbound.materialTypes = [_materialInbound.materialType, _materialInbound.materialVarieties, _materialInbound.materialKind];
      this.editModel = true;
      this.isVisible = true;
    } 


    getDetailCode() {
      try {
        let _materialTypes = this.materialInbound.materialTypes || [];
        let _typeName              = _materialTypes[0],
              _materialType        = this.treeNode.find(val => val.name === _typeName),
              _materialVarietyList = _materialType.children,
              _materialVariety     = _materialVarietyList.find(val => val.name === _materialTypes[1]),
              _materialKindList    = _materialVariety.children,
              _materialKind        = _materialKindList.find(val => val.name === _materialTypes[2]);
        this.materialInbound.detailsCode = _materialType.__source__.typeCode + _materialVariety.__source__.varietiesCode + _materialKind.__source__.kindCode;
      } catch(e) {
        this.msg.error('请选择合理的物料分类')
        throw e;
      }

      
    }

    save() {
      this.materialInboundOrder.formType = this.formType;
      this.materialInboundOrder.companyId = this.companyId;
      this.materialInboundOrder.requestVOList = this.materialInboundList.getValue();
      this.materialInboundOrder.createName = this.createName;
      this.materialDataService.saveInboundOrder(this.materialInboundOrder).subscribe(() => {
        this.msg.success('操作成功');
        this.materialInboundList.next([]);
        this.materialInboundOrder = new MaterialInboundOrder();
        this.materialInbound = new MaterialInbound();
      })      
    }

    handleOk() {
      this.getDetailCode();
      let _materialTypes = this.materialInbound.materialTypes || [];
      this.materialInbound.materialType = _materialTypes[0]
      this.materialInbound.materialVarieties = _materialTypes[1]
      this.materialInbound.materialKind = _materialTypes[2]
      if (this.editModel) {
        this.editModel = false;
      } else {
        this.materialInboundList.next(
          [...this.materialInboundList.getValue(), this.materialInbound]
        )
      }
      this.materialInbound = new MaterialInbound();
      this.isVisible = false;
      this.materialInbound.materialTypes = _materialTypes;
    }

}
