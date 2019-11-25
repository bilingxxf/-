import { Component, OnInit, Input } from '@angular/core'
import {NzModalRef} from '../../../../../node_modules/ng-zorro-antd'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CargoListService} from '@core/cargo-list/cargo-list.service'
@Component({
  selector: 'app-modil',
  templateUrl: './modil.html'
})
export class Modil implements OnInit {
   _item: any  
  @Input() item: any
   items:object
  validateForm: FormGroup;
  date:string

  // @Input()
  //   set item(val) {           
  //     this._item = val;
  //     console.log(this._item)
  //   }
  //   get item() {              
  //     return this._item
  //   }
  submitForm(): void {
    console.log(this.item)
    this.item.planedFinishDate=this.validateForm.value.datePicker.getTime()
    this.cargoListService.updatalist(this.item);
  }


  constructor(private fb: FormBuilder,
    private cargoListService: CargoListService
    ) {
    
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      datePicker: [null]
    });
  }

}