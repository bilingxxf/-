import { Component, OnInit, Input } from '@angular/core';
import { SupplieService } from '@core/supplie/supplie.service'
import { SupplieQueryDTO } from '@core/supplie/supplie-query-dto'

@Component({
  selector: 'app-detail-mat',
  templateUrl: './detail-mat.component.html',
})
export class DetailMatComponent implements OnInit {

  @Input() productId: number

  @Input() supplierId: number

  @Input() manufactureType: number

  data:any

  listQuery = new SupplieQueryDTO()

  constructor(
    private supplieService: SupplieService
  ) { }

  ngOnInit() {
    this.listQuery.supplierId = this.supplierId
    this.listQuery.productId = this.productId
    this.listQuery.manufactureType= this.manufactureType
    this.searchData()
  }

  async searchData(reset: boolean = false) {
    if (reset) {
      this.listQuery.page = 1;
    }
    this.listQuery.loading = true;
    this.data = await this.supplieService.fetchDetailList(this.listQuery)
    this.listQuery.loading = false;
  }

}
