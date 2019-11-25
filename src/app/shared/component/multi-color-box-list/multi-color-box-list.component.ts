import { Component, OnInit, Input } from '@angular/core'
import { Box } from '@shared/component/multi-color-box-list/box'

@Component({
  selector: 'app-multi-color-box-list',
  templateUrl: './multi-color-box-list.component.html',
  styleUrls: ['./multi-color-box-list.component.less']
})
export class MultiColorBoxListComponent implements OnInit {

    @Input() backgroundColor = 'white'

    @Input() boxs: Box[]= []

    @Input() multi: boolean = false

    constructor(
    ) { }

    ngOnInit() {
    }

    click(box: Box) {
      if (box.click && !this.multi) box.click()
    }

}
