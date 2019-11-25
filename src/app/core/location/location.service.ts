import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { Country } from './country'
import { State } from '@core/location/state'
import { UtilService } from '@core/util/util.service'
import { Region } from '@core/location/region'
import { LabelValue } from '@core/common-entity/label-value'
import { City } from '@core/location/city'

@Injectable()
export class LocationService {

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async getCountries(): Promise<LabelValue<number>[]> {
        return this.utilService.toLabelValue<number>(await this.http.get('/countries').toPromise(), {
            labelProp: 'name',
            valueProp: 'id'
        })
    }

    async getStates(countryId: number): Promise<LabelValue<number>[]> {
        return this.utilService.toLabelValue<number>(await this.http.get(`/states?${this.utilService.objToSearch({ countryId })}`).toPromise(), {
            labelProp: 'name',
            valueProp: 'id'
        })
    }

    async getCities(countryId: number, stateId: number): Promise<LabelValue<number>[]> {
        return this.utilService.toLabelValue<number>(await this.http.get(`/cities?${this.utilService.objToSearch({ countryId, stateId })}`).toPromise(), {
            labelProp: 'name',
            valueProp: 'id'
        })
    }

    async getRegions(cityId: number): Promise<LabelValue<number>[]>  {
        return this.utilService.toLabelValue<number>(await this.http.get(`/regions?${this.utilService.objToSearch({ cityId })}`).toPromise(), {
            labelProp: 'name',
            valueProp: 'id'
        })
    }

    getCountryById(id: number): Promise<Country> {
        return this.http.get(`/countries/${id}`).toPromise()
    }

    getStateById(id: number): Promise<State> {
        return this.http.get(`/states/${id}`).toPromise()
    }

    getCityById(id: number): Promise<City> {
        return this.http.get(`/cities/${id}`).toPromise()
    }

    getRegionById(id: number): Promise<Region> {
        return this.http.get(`/regions/${id}`).toPromise()
    }
}
