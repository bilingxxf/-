import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'kgToT'
})
export class KgToTPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return ''
    return (value / 1000).toFixed(2)
  }

}
