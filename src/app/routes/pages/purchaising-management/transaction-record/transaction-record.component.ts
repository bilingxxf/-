import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../../services';
import { ActivatedRoute } from '@angular/router'
import { MaterialDataQuery, SupplierQuery } from '../../../../interfaces';
import { UserService } from '@core/user/user.service';


@Component({
  selector: 'app-transaction-record',
  providers: [SupplierService],
  templateUrl: './transaction-record.component.html',
})
export class TransactionRecordComponent implements OnInit {
    supplierId: number
    companyId: number;

    get transcationOrderList () {return this.supplierService.state.transactionRecordList$}
    get supplierList() {
      return this.supplierService.state.supplierList$.getValue();
    }
    materialDataQuery: MaterialDataQuery = {
      page: 1,
      size: 10,
    } as any

    supplierQuery: SupplierQuery = {} as any;
    total: number = 0


    constructor(
      private supplierService: SupplierService,
      private userService: UserService,
      private route: ActivatedRoute,
    ) { }

    ngOnInit() {
      this.route.params
        .subscribe((param) => {
          this.supplierId = Number(param.id);
        })
      
        this.userService.user
        .filter((val: any) => !!val.id)
        .subscribe((user: any) => {
          this.materialDataQuery.companyId = this.companyId = user.department.companyId;
          this.getTranscationOrder()
          this.getSupplierList()
        })
    }

    getTranscationOrder(next = 1) {
      this.materialDataQuery.supplierId = this.supplierId;
      this.supplierService.getTransactionRecord(this.materialDataQuery).subscribe((res: any) => {
        console.log(res);
        this.total = res.totalCount;
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

}
