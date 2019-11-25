import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http.service';
import { Supplier, MaterialInboundOrder, Material } from '../../models';
import { SupplierQuery, PageResponse, MaterialDataQuery } from '../../interfaces';


@Injectable()
export class SupplierService extends HttpService {
  state = {
    supplierList$: new BehaviorSubject<Supplier[]>([]),
    currentSupplier$: new BehaviorSubject<Supplier>(new Supplier()),
    transactionRecordList$: new BehaviorSubject<Material[]>([])
  }
  
  constructor(public injector: Injector) {
    super(injector);
  }

  getSupplierList(query: SupplierQuery) {
    return this.get({
      url: 'supplier/find',
      params: query,
      afterRequest: (res: PageResponse<Supplier>) => {
        this.state.supplierList$.next(
          res.data.map(val => new Supplier(val))
        )
      }
    })
  }

  saveSupplier(supplier: Supplier) {
    return this.post({
      url: 'supplier/save',
      data: supplier,
      afterRequest: (id: number) => {
        supplier.id = id;
        this.updateObservable(this.state.supplierList$, (list) => {
          return [...list, supplier]
        });
      }
    })
  }

  removeSupplier(supplier: Supplier) {
    return this.delete({
      url: `supplier/delete/${supplier.id}`,
      afterRequest: (res) => {
        this.updateObservable(this.state.supplierList$, (list) => {
          return list.removeItem('id', supplier.id);
        })
      }
    })
  }

  updateSupplier(supplier: Supplier) {
    return this.put({
      url: 'supplier/update',
      data: supplier,
      afterRequest: (res: Supplier) => {
        this.updateObservable(this.state.supplierList$, (list) => {
          return list.updateItem('id', Object.assign(supplier, res))
        })
      }
    })
  }

  getTransactionRecord(query: MaterialDataQuery) {
    return this.get({
      url: 'bomDetails/find/list',
      params: query,
      afterRequest: (res: PageResponse<Material>) => {
        this.state.transactionRecordList$.next(res.data);
      }
    })
  }
}