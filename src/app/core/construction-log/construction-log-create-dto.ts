import { Weather } from '../../constant/weather.enum'
import * as moment from 'moment'

export class ConstructionLogCreateDto {
  projectId: number

  /**
	 * 记录者的用户id
	 */
  userId: number

  morningWeather: Weather

  morningTemperature: number

  morningTip: string

  afternoonWeather: Weather

  afternoonTemperature: number

  afternoonTip: string

  /**
	 * 日志内容
	 */
  content: string

  /**
   * YYYY-MM-DD
   */
  recordDate: string

  setDate(date: Date) {
    this.recordDate = moment(date).format('YYYY-MM-DD')
  }
}
