import { EnumToArrayPipe } from './enum-to-array.pipe'
import { DurationPipe } from './duration.pipe'
import { CountryPipe } from './country.pipe'
import { StatePipe } from './state.pipe'
import { CityPipe } from '@shared/pipes/city.pipe'
import { RegionPipe } from '@shared/pipes/region.pipe'
import { KgToTPipe } from './kg-to-t.pipe'
import { YToWyPipe } from '@shared/pipes/y-to-wy.pipe'

export const PIPES = [
    EnumToArrayPipe,
    DurationPipe,
    CountryPipe,
    StatePipe,
    CityPipe,
    RegionPipe,
    KgToTPipe,
    YToWyPipe
]
