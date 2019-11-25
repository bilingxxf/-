export class ProductSubcontractBatchSaveReqDto {
  productBatchSubcontractList: {
    productId: number
    quantity: number
  }[] = []

  subcontractorId: number
}
