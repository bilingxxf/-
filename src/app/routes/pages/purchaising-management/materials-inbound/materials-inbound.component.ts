import { Component, OnInit } from '@angular/core';
import { MaterialDataService } from '../../../../services';
import { UserService } from '@core/user/user.service';
import { MaterialInOutQuery } from '../../../../interfaces';
import { MaterialInboundStatus } from '../../../../constant/material-inbound-status.enum';
import { iterateEnum } from '../../../../utils';
import { MaterailTypes } from '../../../../constant/material-type.enmu';
import { MaterialInboundOrder } from '../../../../models'
import { ActivatedRoute } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd';



@Component({
  selector: 'app-materials-inbound',
  providers: [MaterialDataService],
  templateUrl: './materials-inbound.component.html',
})
export class MaterialsInboundComponent implements OnInit {
    type: string;
    companyId: number
    isVisible = false;
    materialInOutQuery: MaterialInOutQuery = {
      size: 10,
      page: 1
    } as any;
    get material() {return this.materialDataService.state}
    MaterialInboundStatus = MaterialInboundStatus;
    materailTypes: any[] = [];
    materialInboundStatus: any[] = []

    constructor(
      private materialDataService: MaterialDataService,
      private userService: UserService,
      private route: ActivatedRoute,
      private confirmService: NzModalService
    ) {
      this.materailTypes = iterateEnum(MaterailTypes).map(val => {
        return {
          label: val[0],
          value: val[1]
        }
      })
      this.materialInboundStatus = iterateEnum(MaterialInboundStatus).map(val => {
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
          this.materialInOutQuery.companyId = this.companyId = user.department.companyId;
          this.getInboundOrderList();
        })
    }
    handleCancel() {
      this.isVisible = false
    }
    handleOk() {
      
    }

    remove(materialInboundOrder: MaterialInboundOrder) {
      this.materialDataService.removeInboundOrder(materialInboundOrder).subscribe();
    }

    updateStatus(row: MaterialInboundOrder) {
      this.confirmService.confirm({
        nzTitle: '提示',
        nzContent: '是否确定入库成功',
        nzOnOk: () => {
          this.confirmMaterialInbound(row, 1)
        },
        nzOnCancel() {
        }
        
      })
    }

    confirmMaterialInbound(row: MaterialInboundOrder, result: number) {
      this.materialDataService.confirmMaterialInbound(row, result).subscribe()
    }

    edit() {

    }
    getInboundOrderList(next = 1) {
      this.materialInOutQuery.page = next;
      this.materialDataService.geInboundOrderList(this.materialInOutQuery).subscribe()
    }

}
