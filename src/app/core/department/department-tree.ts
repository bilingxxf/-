export class DepartmentTreeDto {
  parentDepartmentId: number;
  name: string;
  introduction: string;
  id: number;
  createTime: Date;
  companyId: number;
  // childDepartments: DepartmentTreeDto[];
  children: DepartmentTreeDto[];
  hasChildren?: boolean;
}