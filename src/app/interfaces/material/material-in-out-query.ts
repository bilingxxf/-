import { PageParams } from '../index';

export interface MaterialInOutQuery extends PageParams {
  companyId: number;
  bomNo?: string;
  createName?: Date;
  supplierId?: number;
  formType?: number;
  bomResult?: number;
}