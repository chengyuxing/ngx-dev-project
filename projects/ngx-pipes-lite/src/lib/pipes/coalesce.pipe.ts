import {Pipe, PipeTransform} from '@angular/core';

/**
 * Return first value which not null and not undefined.
 * @usageNotes
 * `any[] | coalesce`
 *
 * ```javascript
 *
 * [null, 'b', 'c', 'd'] | coalesce
 * // output: 'b'
 * ```
 */
@Pipe({
  standalone: true,
  name: 'coalesce'
})
export class CoalescePipe implements PipeTransform {
  /**
   * Return first value which not null and not undefined.
   * @param values some values
   */
  transform(...values: any[]): any {
    for (const item of values) {
      if (item !== null && item !== undefined) {
        return item;
      }
    }
    return null;
  }

}
