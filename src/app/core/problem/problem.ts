import { ProblemStatus } from '../../constant/problem-status.enum'

export class Problem {

  /**
   * 问题报告id
   */
  problemId: number

  /**
   * 检查人的用户id
   */
  userId: number

  /**
   * 检查人的用户名称
   */
  userName: string

  /**
   * 部门名称列表
   */
  departments: string[] = []

  /**
   * 问题报告的状态
   */
  status: ProblemStatus

  /**
   * 上报时间
   */
  createTime: number
}
