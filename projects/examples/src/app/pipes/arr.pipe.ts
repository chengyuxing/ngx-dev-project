import {Pipe, PipeTransform} from '@angular/core';

export type Func =
  'sum'| 'max'| 'min'


@Pipe({
  name: 'arr'
})
export class ArrPipe implements PipeTransform {

  transform(value: number[], func: Func): number {
    if (value) {
      return Math.max(...value);
    }
    return 0;
  }

}
