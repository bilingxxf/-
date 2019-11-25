import { PageParams } from '../index';


// export interface MaterialVariety {
//   companyId: number;
//   varietiesCode: string;
//   varietiesName: string;
//   typeId: number;
//   createTime?: Date;
//   updateTime?: Date;
//   id?: number;
// }


export interface MaterialVarietyQuery extends PageParams {
  companyId: number;
  typeId: number
}