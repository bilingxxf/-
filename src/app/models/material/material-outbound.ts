import { Material } from './material';


export class MaterialOutbound extends Material {
  outboundNo: string
}

export class MaterialOutboundOrder {
  companyId: number;
  createName: string;
  createTime: Date;
  formType: number;
  id: number;
  name: string;
  outboundDetailResponseVOS: Material[] = []
  outboundNo: string;
  type: number;
  updateTime: Date;
}