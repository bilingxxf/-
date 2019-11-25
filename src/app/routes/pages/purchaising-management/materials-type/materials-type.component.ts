import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialService } from '../../../../services';
import { UserService } from '@core/user/user.service';
import { TreeNode } from '../../../../models';
import { filter } from 'rxjs/operator/filter';
import { MaterialType, MaterialKind, MaterialVariety } from '../../../../models';
import { MaterialKindQuery, MaterialTypeQuery, MaterialVarietyQuery } from '../../../../interfaces'
import { MaterailTypes } from '../../../../constant/material-type.enmu';
import { iterateEnum } from '../../../../utils';


@Component({
  selector: 'app-materials-type',
  providers: [MaterialService],
  templateUrl: './materials-type.component.html',
})
export class MaterialsTypeComponent implements OnInit {
    @ViewChild('MaterialType') materialTypeForm: any
    @ViewChild('MaterialVariety') materialVarietyForm: any
    @ViewChild('MaterialKind') materialKindForm: any

    template: any = this.materialTypeForm;

    get material() { return this.materialService.state }
    get nodes() { return this.materialService.state.treeNode$}

    materialTypeQuery: MaterialTypeQuery = {} as any;
    materialKindQuery: MaterialKindQuery = {} as any;
    materialVarietyQuery: MaterialVarietyQuery = {} as any;

    materialType = new MaterialType();
    materialVariety = new MaterialVariety();
    materialKind = new MaterialKind();
    
    materailTypes: any[] = [];
    companyId: number;
    isVisible = false;
    options = {
      isExpandedField: 'expanded',
    }
    currentNode: TreeNode

    constructor(
        private materialService: MaterialService,
        private userService: UserService
    ) {
      this.materailTypes = iterateEnum(MaterailTypes).map(val => {
        return {
          label: val[0],
          value: val[1]
        }
      })
     }

    ngOnInit() {
      this.userService.user
        .filter((val: any) => !!val.id)
        .subscribe((user: any) => {
          this.companyId = user.department.companyId;
          this.getMaterialTypeList();
        })
    }

    getChildren(event) {
      let { node } = event
      let _data: MaterialType | MaterialVariety | MaterialKind = node.data.__source__;
      switch (_data.level) {
        case 1:
          this.getMaterialVarietyList((_data as MaterialType).id);
          break;
        case 2:
          this.getMaterialKindList((_data as MaterialVariety).id);
          break;
      }
    }

    handleCancel() {
      this.isVisible = false;
    }

    getCurrentNode(node: TreeNode) {
      this.currentNode = node;
    }
    

    addChildNode(node: TreeNode) {
      let _data: MaterialType | MaterialVariety | MaterialKind = node.__source__;
      switch (_data.level) {
        case 1:
          this.addMaterialVariety(_data as MaterialType)
          break;
        case 2:
          this.addMaterialKind(_data as MaterialVariety)
          break;
      }
    }

    getMaterialTypeList() {
      this.materialTypeQuery = {
        page: 1,
        size: 100,
        companyId: this.companyId
      }
      this.materialService.getMaterialTypeList(this.materialTypeQuery).subscribe();
    }

    addMaterialType() {
      if (this.isVisible && !this.materialType.id) {
        this.materialType.companyId = this.companyId;
        this.materialService.saveMaterialType(this.materialType).subscribe(() => {
          this.isVisible = false;
          this.materialType = new MaterialType();
        })
      } else if (this.isVisible && this.materialType.id) {
        this.materialService.undateMaterialType(this.materialType).subscribe(() => {
          this.isVisible = false;
          this.materialType = new MaterialType();
        })
      } else {
        this.isVisible = true;
        this.template = this.materialTypeForm;
      }
    }

    addMaterialVariety(materialType?: MaterialType) {
      if (this.isVisible && !this.materialVariety.id) {
        this.materialService.saveMaterialVariety(this.materialVariety).subscribe(() => {
          this.isVisible = false;
          this.materialVariety = new MaterialVariety();
        })
      } else if (this.isVisible && this.materialVariety.id) {
        this.materialService.udateMaterialVariety(this.materialVariety).subscribe(() => {
          this.isVisible = false;
          this.materialVariety = new MaterialVariety();
        })
      } else {
        this.isVisible = true;
        this.materialVariety.typeId =  this.materialVariety.typeId || materialType.id;
        this.materialVariety.companyId = this.companyId;
        this.template = this.materialVarietyForm;
      }
    }

    addMaterialKind(materialVariety?: MaterialVariety) {
      if (this.isVisible && !this.materialKind.id) {
        this.materialService.saveMaterialKind(this.materialKind).subscribe(() => {
          this.isVisible = false;
          this.materialKind = new MaterialKind();
        })
      } else if (this.isVisible && this.materialKind.id) {
        this.materialService.udateMaterialKind(this.materialKind).subscribe(() => {
          this.isVisible = false;
          this.materialKind = new MaterialKind();
        })
      } else {
        this.isVisible = true;
        this.materialKind.companyId = this.companyId;
        this.materialKind.varietiesId = this.materialKind.varietiesId || materialVariety.id;
        this.template = this.materialKindForm;
      }
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
      return this.materialService.getMaterialVarietyList(this.materialVarietyQuery).subscribe();
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
      this.materialService.getMaterialKindList(this.materialKindQuery).subscribe();
    }

    removeTreeNode(node: TreeNode) {
      let _data: MaterialType | MaterialKind | MaterialVariety = node.__source__;
      switch(_data.level) {
        case 3:
          this.materialService.removeMaterialKind(_data as MaterialKind).subscribe()
          break;
        case 2:
          this.materialService.removeMaterialVariety(_data as MaterialVariety).subscribe()
          break;
        case 1:
          this.materialService.removeMaterialType(_data.id).subscribe()
          break;
      }
    }

    updateTreeNode(node: TreeNode) {
      let _data: MaterialType | MaterialKind | MaterialVariety = node.__source__;
      switch(_data.level) {
        case 3:
          this.materialKind = _data as MaterialKind;
          this.addMaterialKind()
          break;
        case 2:
          this.materialVariety = _data as MaterialVariety;
          this.addMaterialVariety()
          break;
        case 1:
          this.materialType = _data as MaterialType;
          this.addMaterialType()
          break
      }
    }

}
 