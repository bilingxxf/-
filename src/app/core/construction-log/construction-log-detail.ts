import { Weather } from '../../constant/weather.enum'

export class ConstructionLogDetail {
  morningWeather: Weather

  morningTemperature: number

  morningTip: string

  afternoonWeather: Weather

  afternoonTemperature: number

  afternoonTip: string
  userName: string;

  /**
	 * 日志内容
	 */
  content: string

  /**
   * YYYY-MM-DD
   */
  recordDate: string

  createTime: number
}
