export class ApprovalListItem {

  /** 对应待审批的实体的id */
  entityId: number

  /** 整个流程的Id */
  processInstanceId: string

  /** 这个审批任务的id */
  taskId: string

  /** 审批类型 */
  taskType: string

  /** 备注 */
  tip: string
}
