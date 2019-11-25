import { Material } from './material';

export class MaterialInbound extends Material {
  bomId: number;
  detailsCode: string;
}

export class MaterialInboundOrder {
  companyId: number;
  bomNo: string;
  createName: string;
  totalPrice: number;
  formType: number;
  id: number;
  bomResult: number;
  requestVOList?: MaterialInbound[];

  constructor(params = {}) {
    return Object.assign(this, params)
  }
}