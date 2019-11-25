import { Material } from './material';

export class MaterialData extends Material {
  actualNumber: number;
  actualWeight: number;
  actualLength: number;
  actualWidth: number;
  actualThickness: number;
  oddmentId: number;
  bomDetailsId?: number;
  bomTime?: Date;
  oddmentNumber?: number;
  oddmentWeight?: number;
  oddmentLenght?: number;
  oddmentWidth?: number;
}

export class MaterialDataOutboundOrder {
  allOddment: MaterialData[] = [];
  companyId: number;
  createName: string;
  formType: number;
  name: string;
  remainOddment: MaterialData[] = [];
  type: number = 1;
}