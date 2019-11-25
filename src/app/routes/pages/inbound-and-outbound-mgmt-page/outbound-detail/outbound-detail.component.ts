import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
    selector: 'app-outbound-detail',
    templateUrl: './outbound-detail.component.html',
})
export class OutboundDetailComponent implements OnInit {

    _currentMonomer: any
    @Input()
    set currentMonomer(val) {
        this._currentMonomer = val;
    }
    get currentMonomer() {
        return this._currentMonomer
    }

    leftSelectedIndex: number = 0

    leftTabs: any = [{
            name: '结构',
            value: 'structure',
            index: 0
        },
        {
            name: '围护',
            value: 'enclosure',
            index: 1
        },
        {
            name: '辅材',
            value: 'material',
            index: 2
        }
    ]

    constructor() {}

    ngOnInit() {}

}
