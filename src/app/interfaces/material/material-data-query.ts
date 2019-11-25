import { PageParams } from '../http/page-params';

export interface MaterialDataQuery extends PageParams {
  companyId: number;
  formType?: number;
  materialType?: string;
  materialVarieties?: string;
  materialKind?: string;
  brand?: string;
  supplierCode?: string;
  supplierId?: number;
}