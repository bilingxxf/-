import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-project-c-steps',
  templateUrl: './project-c-steps.component.html',
  styleUrls: ['./project-c-steps.component.less']
})
export class ProjectCStepsComponent implements OnInit {

    @Input() current = 0

    constructor(
    ) { }

    ngOnInit() {
    }

}
