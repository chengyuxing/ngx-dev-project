import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: string, length = 15, replace = '...'): string {
    if (value) {
      if (value.length < length) {
        return value;
      }
      return value.substring(0, length) + replace;
    }
    return value;
  }

}
