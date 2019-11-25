export class GetImageProgressResItemDto {
  dailyImageInfo: {
    createTime: number
    id: number
    projectId: number
    photo?: {
      createTime: number
      fileName: string
      filePath: string
    }
  }[] = []
}
