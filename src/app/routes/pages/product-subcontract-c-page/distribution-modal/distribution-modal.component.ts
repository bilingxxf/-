import * as _ from 'lodash'
import { Component, OnInit, Input } from '@angular/core'
import { NzModalRef, NzMessageService } from 'ng-zorro-antd'
import { Subcontractor } from '../../../../core/subcontractor/subcontractor'
import { SubcontractorService } from '@core/subcontractor/subcontractor.service'
import { ProductSubcontract, SubcontractDetailList } from '../../../../core/product/product-subcontract'
import { ProductService } from '../../../../core/product/product.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-distribution-modal',
  templateUrl: './distribution-modal.component.html',
})
export class DistributionModalComponent implements OnInit {

    subcontractors: Subcontractor[] = []

    @Input() product = new ProductSubcontract()

    subcontractDetailList: SubcontractDetailList[] = []

    submitting = false

    constructor(
        private subject: NzModalRef,
        private subcontractorService: SubcontractorService,
        private productService: ProductService,
        private msg: NzMessageService
    ) { }

    async ngOnInit() {
        this.subcontractors = await this.subcontractorService.getAll()
        this.subcontractDetailList = _.cloneDeep(this.product.subcontractDetailList)
    }

    add() {
        this.subcontractDetailList.push(new SubcontractDetailList())
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {

        // 只选择填写了分包商和数量的行
        this.subcontractDetailList = this.subcontractDetailList.filter(o => o.subcontractorId && o.quantity)
        if (!this.subcontractDetailList.length) {
            this.msg.warning('请输入分包数量');
            return;
        }

        if (_.sumBy(this.subcontractDetailList, 'quantity') > this.product.quantity)
            return this.msg.error('总数超出')

        try {
            this.submitting = true

            // 保存
            await Promise.all(this.subcontractDetailList.map(o =>
                this.productService.setProductSubtract(Object.assign({}, o, {productId: this.product.id}))))

            this.product.subcontractDetailList = this.subcontractDetailList
            this.msg.success('分包成功')
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
        // let start = -1
        // let end = -1
        // this.data.forEach(d => {
        //     if (!d.count || !d.sub) return
        //     end += d.count
        //     this.c[5].forEach((c, index) => {
        //         if (index > start && index <= end) this.c[5][index] = d.sub
        //     })
        //     start += d.count
        // })
        // this.subject.triggerOk();
        // try {
        //     this.submitting = true
        //     await this.userService.createUser(this.dto, this.dealerId)
        //     this.messageService.success('创建成功')
        //     this.subject.triggerOk();
        // } catch (e) {
        //     this.submitting = false
        //     this.messageService.error(e.error.message)
        // }
    }
}
