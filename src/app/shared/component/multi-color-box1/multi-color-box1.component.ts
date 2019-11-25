import { Component, OnInit, Input } from '@angular/core'
import { ColorArea } from '@shared/component/multi-color-box1/color-area'

@Component({
  selector: 'app-multi-color-box1',
  templateUrl: './multi-color-box1.component.html',
  styleUrls: ['./multi-color-box1.component.less']
})
export class MultiColorBoxComponent1 implements OnInit {

    /** 背景颜色 */
    @Input() backgroundColor = 'white'

    /** 颜色区域 */
    @Input() areas: ColorArea[] = []

    /** 文字信息 */
    @Input() tooltip: string

    _content: string
    @Input() 
    set content(val) {
      this._content = val
      this.contents = val.split(' ')
      // console.log(this.contents,'ll')
    }

    get content() {
      return this._content
    }

    @Input() multi: boolean = false

    @Input() box: any

    contents: string[]

    constructor(

    ) { }

    ngOnInit() {
      // this.contents = this.content.split(' ')
    }

    stop(event) {
      console.log(event);
    }

}

