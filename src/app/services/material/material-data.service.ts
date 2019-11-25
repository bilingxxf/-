import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http.service';
import { Material, MaterialInbound, MaterialInboundOrder, MaterialDataOutboundOrder, MaterialData, MaterialReturnData, MaterialOutbound, MaterialOutboundOrder } from '../../models'
import { MaterialInOutQuery, PageResponse, MaterialDataQuery } from '../../interfaces';

@Injectable()
export class MaterialDataService extends HttpService {
  state = {
    materialInboundOrderList$: new BehaviorSubject<MaterialInboundOrder[]>([]),
    currentMaterialInboundOrder$: new BehaviorSubject<MaterialInboundOrder>(new MaterialInboundOrder()),
    total$: new BehaviorSubject<Number>(0),
    currentMaterialData$: new BehaviorSubject<MaterialData>(new MaterialData()),
    materialDataList$: new BehaviorSubject<MaterialData[]>([]),
    materialDataOutboundList$: new BehaviorSubject<MaterialData[]>([]),
    materialReturnDataList$: new BehaviorSubject<MaterialReturnData[]>([]),
    materialOutboundOrderList$: new BehaviorSubject<MaterialOutboundOrder[]>([]),
    currentMaterialOutboundOrder$: new BehaviorSubject<MaterialOutboundOrder>(new MaterialOutboundOrder())
  }
  constructor(public injector: Injector) {
    super(injector);
  }

  geInboundOrderList(query: MaterialInOutQuery) {
    return this.get({
      url: 'bom/find/list',
      params: query,
      afterRequest: (res: PageResponse<MaterialInboundOrder>) => {
        this.state.materialInboundOrderList$.next(res.data.map(val => new MaterialInboundOrder(val)));
      }
    })
  }

  saveInboundOrder(materialInboundOrder: MaterialInboundOrder) {
    return this.post({
      url: 'bom/save',
      data: materialInboundOrder,
      afterRequest:(id: string) => {
        materialInboundOrder.bomNo = id
        this.updateObservable(this.state.materialInboundOrderList$, (list) => {
          return [...list, materialInboundOrder]
        })
      }
    })
  }

  removeInboundOrder(materialInboundOrder: MaterialInboundOrder) {
    return this.delete({
      url: `bom/delete/${materialInboundOrder.id}`,
      afterRequest: () => {
        this.updateObservable(this.state.materialInboundOrderList$, (list) => {
          return list.removeItem('id', materialInboundOrder.id);
        })
      }
    })
  }

  confirmMaterialInbound(row: MaterialInboundOrder, result: number) {
    return this.post({
      url: 'bom/update/result',
      params: {
        id: row.id,
        result
      },
      afterRequest: (res: any) => {
        this.updateObservable(this.state.materialInboundOrderList$, (list: MaterialInboundOrder[]) => {
          row.bomResult = result
          return list.updateItem('id', row);
        })
      }
    })
  }

  getInboundOrderDetail(id: number) {
    return this.get({
      url: `bom/find/${id}`,
      afterRequest: (res: MaterialInboundOrder) => {
        res.requestVOList = (res as any).bomDetailResponseVOS;
        this.state.currentMaterialInboundOrder$.next(
          new MaterialInboundOrder(res)
        );
      }
    })
  }

  getMaterialData(query: MaterialDataQuery) { 
    return this.get({
      url: 'oddment/find/list',
      params:  query,
      afterRequest: (res: PageResponse<MaterialData>) => {
        this.state.total$.next(res.totalCount);
        this.state.materialDataList$.next(res.data);
      }
    })
  }

  getMaterialDataDetail(id: number) {
    return this.get({
      url: 'oddment/find/get',
      params: {
        id: id
      },
      afterRequest: (res: MaterialData) => {
        this.state.currentMaterialData$.next(res);
      }
    })
  }

  saveMaterialDataOutboundOrder(query: MaterialDataOutboundOrder) {
    return this.post({
      url: 'outbound/save',
      data: query
    })
  }

  addNewMaterialDataOutbound(materialData: MaterialData) {
    this.state.materialDataOutboundList$.next(
      [...this.state.materialDataOutboundList$.getValue(), materialData]
    )
  }

  removeMaterialDataOutbound(materialData: MaterialData) {
    this.state.materialDataOutboundList$.next(
      this.state.materialDataOutboundList$.getValue().removeItem('oddmentId', materialData.oddmentId)
    )
  }

  // 退库
  returnMaterialData(materialData: MaterialReturnData) {
    return this.post({
      url: 'cancellingStocks/save',
      data: materialData,
      afterRequest: (res: any) => {
        console.log(res);
      }
    })

  }

  getMaterialReturnOrder(query: MaterialDataQuery) {
    return this.get({
      url: 'cancellingStocks/find/list',
      params: query,
      afterRequest: (res: PageResponse<MaterialReturnData>) => {
        this.state.materialReturnDataList$.next(res.data);
      }
    })
  }

  removeMaterialReturnOrder(row: MaterialReturnData) {
    return this.delete({
      url: 'cancellingStocks/delete',
      params: {
        id: row.id
      },
      afterRequest: (res: any) => {
        this.updateObservable(this.state.materialReturnDataList$, (list: MaterialReturnData[]) => {
          return list.removeItem('id', row.id);
        })
      }
    })
  }

  upDateMaterialReturnOrderStatus(row: MaterialReturnData) {
    return this.put({
      url: 'cancellingStocks/updateResult',
      params: {
        id: row.id, 
        result: row.result
      },
      afterRequest: () => {
        this.updateObservable(this.state.materialReturnDataList$, (list: MaterialReturnData[]) => {
          return list.updateItem('id', row);
        })
      }
    })
  }

  // 出库
  getMaterialOutboundOrder(query: MaterialDataQuery) {
    return this.get({
      url: 'outbound/find/list',
      params: query,
      afterRequest: (res: PageResponse<MaterialOutboundOrder>) => {
        this.state.materialOutboundOrderList$.next(res.data)
      }
    })
  }

  getMaterialOutboundDetail(id: number) {
    return this.get({
      url: `outbound/find`,
      params: {
        id
      }
      // afterRequest: (res: MaterialOutboundOrder) => {
      //   this.state.currentMaterialOutboundOrder$.next(res)
      // }
    })
  }
}
