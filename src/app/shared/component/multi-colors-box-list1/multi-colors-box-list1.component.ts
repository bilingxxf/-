import { Component, OnInit, Input } from '@angular/core'
import { Box } from '@shared/component/multi-colors-box-list1/box'

@Component({
  selector: 'app-multi-colors-box-list1',
  templateUrl: './multi-colors-box-list1.component.html',
  styleUrls: ['./multi-colors-box-list1.component.less']
})
export class MultiColorBoxListComponent1 implements OnInit {

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
