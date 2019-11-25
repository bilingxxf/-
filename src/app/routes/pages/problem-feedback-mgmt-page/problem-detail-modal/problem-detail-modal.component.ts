import { Component, OnInit, Input } from '@angular/core'
import { ProblemService } from '../../../../core/problem/problem.service'
import { ProblemDetail } from '@core/problem/problem-detail'

@Component({
    selector: 'app-problem-detail-modal',
    templateUrl: './problem-detail-modal.component.html',
})
export class ProblemDetailModalComponent implements OnInit {

    problemDetail = new ProblemDetail()

    @Input() problemId: number

    constructor(
        private problemService: ProblemService
    ) { }

    async ngOnInit() {
        this.problemDetail = await this.problemService.d(this.problemId)
    }

}
