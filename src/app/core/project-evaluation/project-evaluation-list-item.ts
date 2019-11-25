import * as _ from 'lodash'
export class ProjectEvaluationListItem {
  id: number

  /**
   * 评价者用户id
   */
  userId: number

  /**
   * 评价者用户名字
   */
  userName: string

  /**
   * 项目的id
   */
  projectId: number

  /**
   * 项目的名字
   */
  projectName: string

  /**
   * 施工资料评分 10分.非常好; 8分.很好; 4分.一般; 0分.很差
   */
  constructionDoc: number

  /**
   * 办公环境评分
   */
  officeEnvironment: number

  /**
   * 安全防护评分
   */
  safetyProtection: number

  /**
   * 施工环境评分
   */
  constructionEnvironment: number

  /**
   * 评价内容
   */
  content: string

  /**
   * 评价时间
   */
  createTime: number

  pointToStr(point: number): string {
    switch (point) {
      case 0:
        return '很差'
      case 4:
        return '一般'
      case 8:
        return '很好'
      case 10:
        return '非常好'
      default:
        return '一般'
    }
  }

  /**
   * 获取总分
   */
  getTotalPoints(): number {
    return _.sum([this.constructionDoc, this.officeEnvironment, this.safetyProtection, this.constructionEnvironment])
  }
}
