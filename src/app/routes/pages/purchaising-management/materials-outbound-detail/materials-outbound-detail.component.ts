import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialDataService } from '../../../../services';
import { ActivatedRoute } from '@angular/router'
import { MaterialOutboundOrder } from '../../../../models';


@Component({
  selector: 'app-materials-outbound-detail',
  providers: [MaterialDataService],
  templateUrl: './materials-outbound-detail.component.html',
})
export class MaterialsOutboundDetailComponent implements OnInit {
    @ViewChild('steel') steel: any
    @ViewChild('profile') profile: any
    @ViewChild('color') color: any
    @ViewChild('enclosure') enclosure: any
    @ViewChild('base') base: any

    materialOutboundOrder = new MaterialOutboundOrder();

    // get materialOutboundData() { return this.materialDataService.state.currentMaterialOutboundOrder$ }

    template = this.steel;

    _formType: number = 0;
    get formType() {
      return this._formType
    }
    set formType(val) {
      this._formType = val;
      switch(val) {
        case 0:
          this.template = this.steel;
          break;
        case 1:
          this.template = this.profile;
          break;
        case 2:
          this.template = this.color;
          break;
        case 3: 
          this.template = this.enclosure;
          break
        case 4:
          this.template = this.base;
          break
        default:
          this.template = this.steel;
      }
    }

    constructor(
      private materialDataService: MaterialDataService,
      private route: ActivatedRoute,
    ) { }

    ngOnInit() {
      this.route.queryParams
        .filter((val: any) => !!val.id)
        .subscribe((query) => {
          this.materialDataService.getMaterialOutboundDetail(query.id).subscribe((res: MaterialOutboundOrder) => {
            this.materialOutboundOrder = res;
          });
          this.formType = Number(query.formType);
        })
    }

}
