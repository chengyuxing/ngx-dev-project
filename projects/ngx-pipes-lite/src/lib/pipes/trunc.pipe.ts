import {Pipe, PipeTransform} from '@angular/core';

/**
 * truncate long text.
 * @usageNotes
 * `string | trunc:length?=15:replace?='...'`
 */
@Pipe({
  name: 'trunc',
  standalone: true
})
export class TruncPipe implements PipeTransform {
  /**
   * truncate long text.
   * @param value string text
   * @param length max length to be left
   * @param replace replaced text
   */
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
