import { Component, OnInit, Input } from '@angular/core'
import { InvoiceService } from '../../../../core/invoice/invoice.service'
import { NzModalService } from '../../../../../../node_modules/ng-zorro-antd'
import { ReceiptCreateModalComponent } from './receipt-create-modal/receipt-create-modal.component'
import { InvoiceQueryDto } from '../../../../core/invoice/invoice-query-dto'
import { InvoiceTypes } from '../../../../constant/invoice-types.enum'
import { InvoicePagingData } from '../../../../core/invoice/invoice-paging-data'
import { ProjectService } from '@core/project/project.service'
import { UserService } from '@core/user/user.service';
import { LogDTO } from '@core/user/log-dto';
import { LogTypes} from '../../../../constant/log-types.enum';
import { ActivatedRoute } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'


@Component({
  selector: 'app-receipt-mgmt',
  templateUrl: './receipt-mgmt.component.html',
})
export class ReceiptMgmtComponent implements OnInit {

    @Input() projectId: number

    totalAmount: number

    dto = new InvoiceQueryDto()

    data = new InvoicePagingData()
    reason = '';

    constructor(
        private invoiceService: InvoiceService,
        private modal: NzModalService,
        private projectService: ProjectService,
        private userService: UserService,
        private msg: NzMessageService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.dto.projectId = this.projectId
        this.dto.type = InvoiceTypes.收款
        this.getData()
    }

    openCreateModal() {
        this.modal.create({
            nzTitle: `添加收款记录`,
            nzContent: ReceiptCreateModalComponent,
            nzWidth: 600,
            nzMaskClosable: false,
            nzComponentParams: {
                projectId: this.projectId
            },
            nzOnOk: async () => {
                this.getData()
            },
            nzFooter: null
        })
    }

    async remove(row: any) {
        await this.invoiceService.remove(row.id);
        this.getData();
    }

    async getData() {
        this.data = await this.invoiceService.list(this.dto)
        this.totalAmount = (await this.projectService.getProjectInfoDetail(this.projectId)).amount
    }

    async showEditDialog(row: any) {
        console.log(row);
        await this.showAlert();
        this.modal.create({
            nzTitle: '修改收款记录',
            nzContent: ReceiptCreateModalComponent,
            nzWidth: 600,
            nzMaskClosable: false,
            nzComponentParams: {
                projectId: this.projectId,
                dto: row
            },
            nzOnOk: async () => {
                this.addLog();
                this.getData()
            },
            nzFooter: null
        })
    }

    async showAlert() {
        let {value: reason} = await this.userService.showAlert();
        if (!reason) {
          this.msg.error('请输入执行原因');
          throw new Error('请输入执行原因');
        }
        this.reason = reason;
      }
  
      async addLog() {
        const query = new LogDTO();
        query.projectId = this.projectId;
        query.type = LogTypes.技术修改记录;
        query.description = this.reason;
        await this.userService.addLog(query)
      }
}
