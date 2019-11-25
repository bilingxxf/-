import { PageParams } from '../index';

// export interface MaterialKind {
//   companyId: number;
//   kindCode: string;
//   kindName: string;
//   minimumInventory: number;
//   varietiesId: number;
//   unit: string;
//   createTime?: Date;
//   updateTime?: Date;
//   id?: number;
// }

export interface MaterialKindQuery extends PageParams {
  varietiesId: number;
  companyId: number;
}