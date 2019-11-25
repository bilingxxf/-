import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'yToWy'
})
export class YToWyPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return ''
    return (value / 10000).toFixed(2)
  }

}
