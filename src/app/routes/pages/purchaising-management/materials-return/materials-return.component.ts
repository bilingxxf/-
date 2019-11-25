import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/user/user.service';
import { MaterialDataService } from '../../../../services';
import { ActivatedRoute } from '@angular/router'
import { MaterialDataQuery } from '../../../../interfaces'
import { MaterialReturnStatus } from '../../../../constant/material-return-status.enum';
import { MaterialReturnData } from 'app/models';
import { NzMessageService } from 'ng-zorro-antd'
import { iterateEnum } from '../../../../utils';
import { MaterailTypes } from '../../../../constant/material-type.enmu';


@Component({
  selector: 'app-materials-return',
  providers: [MaterialDataService],
  templateUrl: './materials-return.component.html',
})
export class MaterialsReturnComponent implements OnInit {
    materialDataQuery: MaterialDataQuery = {
      page: 1,
      size: 10,
      formType: 0
    } as any
    companyId: number
    get materialDataState() { return this.materialDataService.state }
    materialReturnStatus = MaterialReturnStatus

    isVisible = false
    materialReturnData = new MaterialReturnData();
    materailTypes: any[] = [];


    constructor(
      private userService: UserService,
      private materialDataService: MaterialDataService,
      private route: ActivatedRoute,
      private msg: NzMessageService,


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
          this.materialDataQuery.companyId = this.companyId = user.department.companyId;
          this.getMaterialReturnOrder();
        })
    }

    getMaterialReturnOrder(next = 1) {
      this.materialDataQuery.page = next;
      this.materialDataService.getMaterialReturnOrder(this.materialDataQuery).subscribe()
    }

    updateStatus(row: MaterialReturnData) {
      this.materialReturnData = row;
      this.isVisible = true;
    }

    removeMaterialReturnOrder(row: MaterialReturnData) {
      this.materialDataService.removeMaterialReturnOrder(row).subscribe(() => {
        this.msg.success('操作成功');
      })
    }

    updateMaterialReturnOrderStatus(result: number) {
      this.materialReturnData.result = result;
      this.materialDataService.upDateMaterialReturnOrderStatus(this.materialReturnData).subscribe(() => {
        this.msg.success('操作成功');
        this.isVisible = false;
        this.materialReturnData = new MaterialReturnData();
      })
    }
    handleCancel() {
      this.isVisible = false;
    }

}
