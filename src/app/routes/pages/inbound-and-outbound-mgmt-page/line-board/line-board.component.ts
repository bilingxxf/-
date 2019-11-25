import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash'
import * as moment from 'moment';


@Component({
  selector: 'app-line-board',
  templateUrl: './line-board.component.html',
  styles: [
    `.item {
      margin: 0 4px;
      padding: 4px 8px;
      height: 116px;    
      border-top: 2px solid #e9e9e9;
    }

    .item-disabled {
      color: rgba(0, 0, 0, .25);
    }

    .item-wrote {
      border-top-color: #00CC83;
      cursor: pointer;
    }

    .item-unwrote {
      cursor: pointer;

      :hover {
        background-color: #EEF7FD;
      }
    }`
    ]
})
export class LineBoardComponent implements OnInit {
    chunk = _.chunk
    @Input() data: any[] = []
    @Input() title:string

    // @Input() date:Date = new Date()
    isVisible = false
 
    _date = new Date();

    @Input() 
    set date(val){
        this._date = val;
        this.getMonthes()
    } 

    get date() {
        return this._date
    }

    @Output() detail = new EventEmitter<any>();

    go(date) {
        console.log(date);
        this.detail.emit(date);
    }


    weeks = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
    ]

    months: string[] = [];
    monthFormat7: any[]

    getMonthes() {
        this.months = []
        const date = new Date(this.date),
              month = date.getMonth();
        date.setMonth(month + 1);
        date.setDate(0);
        const days = date.getDate();
        for (let i = 1 ; i <= days; i++) {
            date.setDate(i);
            date.setMonth(month);
            this.months.push(
                moment(date).format('YYYY-MM-DD')
            )
        }
        this.monthFormat7 = _.chunk(this.months, 7)
    }
    

    constructor(
    ) { }

    ngOnInit() {
        
    }

}
