export class PermissionModuleDTO {
  description: string;
  name: string;
}

export class LinkPermissionAndGroupDTO {
  groupId: number;
  permissionIdList: number[] = [];
  type: number;
}

export class GetPermissionFromGroupDTO {
  groupId: number;
  type: number;
}