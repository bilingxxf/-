import { Pipe, PipeTransform } from '@angular/core'
import { LocationService } from '@core/location/location.service'

@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

    constructor(
        private locationService: LocationService
    ) { }

    async transform(id: number): Promise<string> {
        if (!id) return
        return (await this.locationService.getCityById(id)).name
    }

}
