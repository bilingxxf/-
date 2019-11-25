export class CargoList {
  id: number

  /**
	 * 发货人的用户id
	 */
  userId: number

  /**
	 * 所属的项目id
	 */
  projectId: number

  /**
	 * 车牌号
	 */
  licensePlate: string

  /**
	 * 司机的手机号
	 */
  phone: string

  /**
	 * 司机的名称
	 */
  name: string

  /**
	 * 货物接收人
	 */
  consignee: string

  /**
	 * 接收人的电话
	 */
  consigneePhone: string

  /**
	 * 创建时间
   *
   * 就是发货时间
	 */
  createTime: number
}
