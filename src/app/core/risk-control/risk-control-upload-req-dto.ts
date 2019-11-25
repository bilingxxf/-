import { RiskControlFiles } from '../../constant/risk-control-files.enum'

export class RiskControlUploadReqDto {
  attachmentId: number
  projectId: number
  type: RiskControlFiles
  userId: number
}
