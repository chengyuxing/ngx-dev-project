import {Pipe, PipeTransform} from '@angular/core';

/**
 * Collect each object values by key.
 * @usageNotes
 * `any[] | zip`
 * ```javascript
 * input: [
 *     {id: 1, name: 'cyx', age: 11},
 *     {id: 2, name: 'abc', age: 21},
 *     {id: 3, name: 'jack', age: 31}
 *   ]
 *
 * input | zip
 *
 * output: {
 *    id: [1, 2, 3],
 *    name: ['cyx', 'abc', 'jack'],
 *    age: [11, 21, 31]
 *  }
 * ```
 */
@Pipe({
  name: 'zip',
  standalone: true
})
export class ZipPipe implements PipeTransform {
  /**
   * Collect each object values by key.
   * @param objects some objects.
   */
  transform(objects: any[] = []): { [index: string]: any[] } {
    if (objects && objects.length > 0) {
      const keys = Object.keys(objects[0]);
      return objects.reduce((acc, curr) => {
        keys.forEach(k => {
          if (!acc[k]) {
            acc[k] = [];
          }
          acc[k].push(curr[k]);
        });
        return acc;
      }, {});
    }
    return {};
  }

}
