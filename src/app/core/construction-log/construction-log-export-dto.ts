export class ConstructionLogExportDto {
  /** YYYY-MM-DD */
  startDate: string

  /** YYYY-MM-DD */
  endDate: string

  constructor(
    public projectId: number
  ) {
    this.projectId = projectId
  }
}
