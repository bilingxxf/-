import { Component, OnInit, Input } from '@angular/core'
import { ProblemService } from '@core/problem/problem.service'
import { PagingData } from '@core/common-entity/paging-data'
import { ProblemQueryDto } from '../../../core/problem/problem-query-dto'
import { UserService } from '@core/user/user.service'
import { ProblemStatus } from '../../../constant/problem-status.enum'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { ProblemDetailModalComponent } from './problem-detail-modal/problem-detail-modal.component'
import { ProblemDetail } from '@core/problem/problem-detail'
import { Lightbox } from '../../../../../node_modules/ngx-lightbox'
import { Attachment } from '../../../core/common-entity/attachment'
import { ProblemTypes } from '../../../constant/problem-types.enum';

@Component({
  selector: 'app-problem-feedback-mgmt-page',
  templateUrl: './problem-feedback-mgmt-page.component.html',
  styles: [
      `th {
          text-align: center !important;
      }`
  ]
})
export class ProblemFeedbackMgmtPageComponent implements OnInit {

    problemStatus = ProblemStatus

    @Input() projectId: number

    data = new PagingData<ProblemDetail>()

    dto = new ProblemQueryDto()

    @Input() typeList: number[]
    @Input() opt = true

    user: any = {};

    ProblemTypes = ProblemTypes

    isSpinning:boolean = false

    constructor(
        private problemService: ProblemService,
        private userService: UserService,
        private msg: NzMessageService,
        private modal: NzModalService,
        private lightbox: Lightbox
    ) { }

    async ngOnInit() {
        this.dto.projectId = this.projectId
        this.user = this.userService.getUser();
        this.dto.userId = this.user.id;
        this.dto.typeList = this.typeList;
        this.getData()
    } 

    async getData() {
        this.isSpinning = true
        try {
            this.data = await this.problemService.list(this.dto);
            this.data.data.forEach((val: any) => {
                if (val.feedbackList && val.feedbackList.length) {
                    val.feedbackList.forEach(feedback => {
                        if (feedback.pictures && feedback.pictures.length) {
                            feedback.pictures = feedback.pictures.map(picture => {
                                const attachment = new Attachment();
                                return Object.assign(attachment, picture);
                            })
                        }
                    })
                }
            })
            this.data.data.forEach(o => o.inspectionItems = o.inspectionItems.filter(ii => !ii.isPassed))
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }
 
    remind() {
        this.msg.success('已催')
    }

    openDetailModal(problemId: number) {
        this.modal.create({
            nzTitle: `问题详情`,
            nzContent: ProblemDetailModalComponent,
            nzComponentParams: { problemId },
            nzWidth: 1000,
            nzMaskClosable: false,
            nzFooter: null
        })
    }

    /**
     * 预览图片
     */
    preview(attachments: Attachment[], index: number) {
        this.lightbox.open(attachments.map(o => ({
            src: o.getPath(),
            thumb: o.getPath()
        })), index)
    }



    async close(id: number): Promise<void> {
        await this.problemService.close(id)
        this.msg.success('关闭成功')
        this.getData()
    }
}
