import {Pipe, PipeTransform} from '@angular/core';

/**
 * Simple array data paging pipe.
 * @usageNotes
 * `[] | paging:page?=1:size?=10`
 */
@Pipe({
  name: 'paging',
  standalone: true
})
export class PagingPipe implements PipeTransform {
  /**
   * Simple array data paging pipe.
   * @param value array data to be paging
   * @param page current page
   * @param size page size
   */
  transform(value: any[], page = 1, size = 10): any[] {
    if (!value) {
      return [];
    }
    if (page < 1) {
      page = 1;
    }
    if (size < 1) {
      size = 1;
    }
    const start = (page - 1) * size;
    const end = page * size;
    return value.slice(start, end);
  }

}
