import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../../../services';
import { UserService } from '@core/user/user.service';
import { Supplier } from '../../../../models';
import { SupplierQuery } from '../../../../interfaces';
import { divisions } from '../../../../utils';


@Component({
  selector: 'app-supplier-management',
  providers: [SupplierService],
  templateUrl: './supplier-management.component.html',
})
export class SupplierManagementComponent implements OnInit {
    isVisible: boolean = false;
    template: any

    @ViewChild('base') Base: any;
    @ViewChild('company') Company: any;
    @ViewChild('contact') Contact: any;

    get suppliers() {
      return this.supplierService.state
    }

    companyId: number
    supplierQuery: SupplierQuery = {
      page: 1,
      size: 10,
    } as any
    supplier = new Supplier();
    divisions = divisions;

    constructor(
      private supplierService: SupplierService,
      private userService: UserService
    ) { }

    ngOnInit() {
      this.template = this.Base;
      this.userService.user
        .filter((val: any) => !!val.id)
        .subscribe((user: any) => {
          this.supplierQuery.companyId = this.companyId = user.department.companyId;
          this.getSupplierList();
        })
    }

    getSupplierList(next: number = 1) {
      this.supplierQuery.page = next;
      this.supplierService.getSupplierList(this.supplierQuery).subscribe()
    }

    handleCancel() {
      this.isVisible = false;
      this.template = this.Base;
    }
    removeSupplier(supplier: Supplier) {
      this.supplierService.removeSupplier(supplier).subscribe();
    }

    updateSupplier(supplier: Supplier) {
      Object.assign(this.supplier, supplier);
      this.supplier.division = [this.supplier.state, this.supplier.city, this.supplier.region];
      this.isVisible = true;
    }
    
    handleOk() {
      if (this.template === this.Base) return this.template = this.Company;
      if (this.template === this.Company) return this.template = this.Contact;
      // 格式化数据调用接口
      this.supplier.state = this.supplier.division[0]
      this.supplier.city = this.supplier.division[1]
      this.supplier.region = this.supplier.division[2]
      if (this.supplier.id) {
        this.supplierService.updateSupplier(this.supplier).subscribe(val => {
          this.isVisible = false;
          this.supplier = new Supplier();
        })
      } else {
        this.supplier.companyId = this.companyId;
        this.supplierService.saveSupplier(this.supplier).subscribe(val => {
          this.isVisible = false;
          this.supplier = new Supplier();
        })
      }
    }

}
