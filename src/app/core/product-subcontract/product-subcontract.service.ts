import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { ProductTypes } from '../../constant/product-types.enum'
import { ProductSubcontractor } from '@core/product-subcontract/product-subcontractor'
import { UtilService } from '@core/util/util.service'
import { ProductSubcontractResDto } from '@core/product-subcontract/product-subcontract-res-dto'
import { ProductSubcontractDetail } from '@core/product-subcontract/product-subcontract-detail'
import { NzNotificationService } from 'ng-zorro-antd'
import { ProductSubcontractBatchSaveReqDto } from './product-subcontract-batch-save-req-dto'

@Injectable()
export class ProductSubcontractService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
    private notification: NzNotificationService
  ) { }

  /**
   * 获取一个单体的区域(辅材、围护)与分包商的关联列表
   *
   * @param monomerId 单体id或者是区域id
   * @param productType 产品类型
   */
  private getSubcontractors(monomerId: number, productType: ProductTypes): Promise<ProductSubcontractor[]> {
    return this.http.get(`/monomers/subcontractors/links?${this.utilService.objToSearch({monomerId, productType})}`).toPromise()
  }

  /**
   * 获取一个单体的区域(辅材、围护)的分包详情
   *
   * @param monomerId 单体id或者是区域id
   * @param productType 产品类型
   */
  async getProductSubcontract(monomerId: number, productType: ProductTypes): Promise<ProductSubcontractDetail[]> {
    const subcontractors = await this.getSubcontractors(monomerId, productType)
    return Promise.all(subcontractors.map(async subcontractor => {
      const detail: ProductSubcontractResDto = await this.http.get(`/monomers/subcontractors/links/${subcontractor.id}?productType=${productType}`).toPromise()
      detail.attachments = detail.attachments || []
      const obj = new ProductSubcontractDetail()
      obj.detail = detail
      obj.attachments = detail.attachments.map(o => o.id)
      obj.totalQuantity = detail.totalQuantity
      obj.totalWeight = detail.totalWeight
      obj.originalFiles = detail.attachments.map(o => ({
        fileName: o.fileName,
        id: o.id
      }))
      obj.subcontractor = subcontractor
      return obj
    }))
  }

  /**
   * 更新附件
   *
   * @param id 区域与分包商的关联id
   * @param attachments 附件列表
   */
  updateAttachments(id: number, attachments: number[]): Promise<void> {
    return this.http.get(`/monomers/subcontractors/links/${id}/attachments?${this.utilService.objToSearch({attachments})}`).toPromise()
  }

  /**
   * 生成导出用的url
   *
   * @param monomerId 单体id或者是区域id
   * @param productType 产品类型
   */
  genExportFileUrl(monomerId: number, productType: ProductTypes): string {
    return `/api/monomers/subcontractors/links/actions/export?${this.utilService.objToSearch({monomerId, productType})}`
  }

  /**
   * 发送
   * 我也不知道这功能干嘛的
   *
   * @param id 关联id
   *
   */
  async send(id: number): Promise<void> {
    await this.http.get(`/monomers/subcontractors/links/${id}/actions/send`).toPromise()
    this.notification.success('发送成功', '')
  }

  /**
   * 批量分包
   *
   * @param dto
   */
  batchSave(dto: ProductSubcontractBatchSaveReqDto): Promise<void> {
    return this.http.post(`/products/subcontracts/actions/batch-save?subcontractorId=${dto.subcontractorId}`, dto.productBatchSubcontractList).toPromise()
  }
}
