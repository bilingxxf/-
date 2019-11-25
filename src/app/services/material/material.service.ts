import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http.service';
import { MaterialKindQuery, MaterialTypeQuery, MaterialVarietyQuery, PageResponse } from '../../interfaces'
import { MaterialType, MaterialKind, MaterialVariety, TreeNode } from '../../models';


@Injectable()
export class MaterialService extends HttpService {
  state = {
    materialTypeList$: new BehaviorSubject<MaterialType[]>([]),
    materialVarietyList$: new BehaviorSubject<MaterialVariety[]>([]),
    materialKindList$: new BehaviorSubject<MaterialKind[]>([]),
    treeNode$: new BehaviorSubject<TreeNode[]>([])
  }

  constructor(public injector: Injector) {
    super(injector);
  }


  saveMaterialType(materialType: MaterialType) {
    return this.post({
      url: 'materialType/save',
      data: materialType,
      afterRequest: (id: number) => {
        materialType.id = id;      
        this.updateObservable(this.state.materialTypeList$, (list) => {
          return [...list, materialType];
        });
        this.updateTrees();
      }
    })
  }

  getMaterialTypeList(materialTypeQuery: MaterialTypeQuery) {
    return this.get({
      url: 'materialType/find',
      params: materialTypeQuery,
      afterRequest:(res: PageResponse<MaterialType>) => {
        let materialTypeList = res.data.map(val => new MaterialType(val))
        this.state.materialTypeList$.next(materialTypeList);
        this.updateTrees()
      }
    })
  }

  removeMaterialType(id: number) {
    return this.delete({
      url: 'materialType/delete',
      params: {
        id
      },
      afterRequest: (res) =>{
        this.updateObservable(this.state.materialTypeList$, (list) => {
          return list.removeItem('id', id)
        });
        this.updateTrees();
      }
    })
  }

  undateMaterialType(materialType: MaterialType) {
    return this.put({
      url:  'materialType/update',
      data: materialType,
      afterRequest: (res) => {
        this.state.materialTypeList$.next(
          this.state.materialTypeList$.getValue().updateItem('id', Object.assign(materialType, res))
        );
        this.updateTrees()
      }
    })
  }
 
  saveMaterialVariety(materialVariety: MaterialVariety) {
    return this.post({
      url: 'materialVarieties/save',
      data: materialVariety,
      afterRequest:(id: number) => {
        materialVariety.id = id;
        let _materialType = this.state.materialTypeList$.getValue().find(val => val.id === materialVariety.typeId);
        _materialType.children.push(materialVariety);
        this.updateObservable(this.state.materialVarietyList$, (list) => {
          return [...list, materialVariety]
        })
        this.updateTrees();
      }
    })
  }

  updateTrees() {
    this.state.treeNode$.next(
      this.state.materialTypeList$.getValue().map(val => {
        return val.transToTreeNode()
      })
    )
  }

  getMaterialVarietyList(materialVarietyQuery: MaterialVarietyQuery) {
    return this.get({
      url: 'materialVarieties/find',
      params: materialVarietyQuery,
      afterRequest:(res: PageResponse<MaterialVariety>) => {
        const _typeId = materialVarietyQuery.typeId;
        let   _materialType = this.state.materialTypeList$.getValue().find(val => val.id === _typeId),
              _materialVarietyList = res.data.map(val => new MaterialVariety(val));
        _materialType.children = _materialVarietyList;
        this.state.materialTypeList$.next(
          this.state.materialTypeList$.getValue().updateItem('id', _materialType)
        )
        this.state.materialVarietyList$.next(_materialVarietyList);
        this.updateTrees()
      }
    })
  }

  removeMaterialVariety(materialVariety: MaterialVariety) {
    return this.delete({
      url: 'materialVarieties/delete',
      params: {
        id: materialVariety.id
      },
      afterRequest: (res) =>{
        let _materialType = this.state.materialTypeList$.getValue().find(val => val.id === materialVariety.typeId);
        _materialType.children = _materialType.children.removeItem('id', materialVariety.id);
        this.state.materialVarietyList$.next(this.state.materialVarietyList$.getValue().removeItem('id', materialVariety.id));
        this.updateTrees();
      }
    })
  }

  udateMaterialVariety(materialVariety: MaterialVariety) {
    return this.put({
      url:  'materialVarieties/update',
      data: materialVariety,
      afterRequest: (res) => {
        this.state.materialVarietyList$.next(
          this.state.materialVarietyList$.getValue().updateItem('id', Object.assign(materialVariety, res))
        )
        this.updateTrees();
      }
    })
  }

  saveMaterialKind(materialKind: MaterialKind) {
    return this.post({
      url: 'materialKind/save',
      data: materialKind,
      afterRequest:(id: number) => {
        materialKind.id = id;
        let _materialVariety = this.state.materialVarietyList$.getValue().find(val => val.id === materialKind.varietiesId);
        _materialVariety.children.push(materialKind);
        this.updateObservable(this.state.materialKindList$, (list) => {
          return [...list, materialKind];
        });
        this.updateTrees();
      }
    })
  }

  getMaterialKindList(materialKindQuery: MaterialKindQuery) {
    return this.get({
      url: 'materialKind/find',
      params: materialKindQuery,
      afterRequest:(res: PageResponse<MaterialKind>) => {
        let _materialVariety  = this.state.materialVarietyList$.getValue().find(val => val.id === materialKindQuery.varietiesId),
            _materialKindList = res.data.map(val => new MaterialKind(val));
        _materialVariety.children = _materialKindList;
        this.state.materialKindList$.next(_materialKindList);
        this.updateTrees();
      }
    })
  }

  removeMaterialKind(materialKind: MaterialKind) {
    return this.delete({
      url: 'materialKind/delete',
      params: {
        id: materialKind.id
      },
      afterRequest: (res) =>{
        let _materialVariety = this.state.materialVarietyList$.getValue().find(val => val.id === materialKind.varietiesId);
        _materialVariety.children = _materialVariety.children.removeItem('id', materialKind.id);
        this.state.materialKindList$.next(
          this.state.materialKindList$.getValue().removeItem('id', materialKind.id)
        );
        this.updateTrees();
      }
    })
  }

  udateMaterialKind(materialKind: MaterialKind) {
    return this.put({
      url:  'materialKind/update',
      data: materialKind,
      afterRequest: (res) => {
        this.state.materialKindList$.next(
          this.state.materialKindList$.getValue().updateItem('id', Object.assign(materialKind, res))
        );
        this.updateTrees();
      }
    })
  }

}