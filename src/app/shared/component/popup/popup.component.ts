import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: [`
    .container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5)
    }

    .popup {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      min-width: 300px;
      background-color: #fff;
    }
  `]
})
export class PopupComponent implements OnInit {
    @Input()  visible: boolean = false;
    @Output() close: EventEmitter<any> = new EventEmitter();

    constructor(
    ) { }

    closeDialog(event: Event) {
      event.stopPropagation();
      event.preventDefault();
      this.close.emit(false)
    }

    ngOnInit() {
    }

}
