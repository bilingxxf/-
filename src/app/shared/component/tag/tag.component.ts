import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styles: [`
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 7px;
  }
  
  .title {
    flex-grow: 0;
  }
  
  .tags {
    display: flex;
    /* margin-bottom:10px; */
    
  }
  
  .tag {
    /* width: 70px; */
    margin-right: 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }`]
})

//position: absolute;right: 80px;top: 40px; flex: 1;
export class TagComponent implements OnInit {

    constructor(
        private http: _HttpClient
    ) { }

    @Input()
    options: any[] = []

    ngOnInit() {
    }

}
