import { Material } from './material';

export class MaterialReturnData extends Material {
  cancellingStocksNumber: number;
  cancellingStocksTime: Date;
  cancellingStocksWeight: number;
  companyId: number;
  id: number
  result: number;
  createName: string;
}