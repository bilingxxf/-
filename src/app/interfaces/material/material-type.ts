import { PageParams } from '../index';

// export interface MaterialType {
//   companyId: number;
//   typeCode: string;
//   typeName: string;
//   group: number;
//   createTime?: Date;
//   updateTime?: Date;
//   id?: number;
// }


export interface MaterialTypeQuery extends PageParams {
  companyId: number;
}