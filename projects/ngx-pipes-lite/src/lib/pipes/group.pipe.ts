import {Pipe, PipeTransform} from '@angular/core';

/**
 * Objects group by key's value.
 * @usageNotes
 * `any[] | group:key`
 * ```javascript
 *
 * input: [
 *    {age:11,name:'cyx'},
 *    {age:11,name:'jack'},
 *    {age:23,name:'abc'}
 *  ]
 *
 * input | group:'age'
 *
 * output: {
 *    11: [{age: 11, name: "cyx"}, {age: 11, name: "jack"}],
 *    23: [{age: 23, name: "abc"}]
 *    }
 * ```
 */
@Pipe({
  name: 'group',
  standalone: true
})
export class GroupPipe implements PipeTransform {
  /**
   * Objects group by key's value.
   * @param objects some objects
   * @param key key
   */
  transform(objects: any[], key: string): { [index: string]: any[] } {
    if (objects && objects.length > 0) {
      return objects.reduce((acc, curr) => {
        const v = curr[key];
        if (!acc[v]) {
          acc[v] = [];
        }
        acc[v].push(curr);
        return acc;
      }, {});
    }
    return {};
  }

}
