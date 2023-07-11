import {Pipe, PipeTransform} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

/**
 * get$ pipe result wrapper.
 */
export class ResultWrapper {
  /**
   * is request server success.
   */
  readonly success: boolean = true;
  /**
   * requested raw data.
   */
  readonly data?: any | any[];
  /**
   * request state message.
   */
  readonly message?: string;

  constructor(success: boolean, data: any | any[], message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  /**
   * ajax request raw data is valid.
   * - Array(length > 0) | Object(keys.length > 0): true
   * - null | undefined | < 0: false
   */
  get valid(): boolean {
    if (this.data) {
      if (this.data instanceof Array) {
        return this.data.length > 0;
      }
      return Object.keys(this.data).length > 0;
    }
    return false;
  }

  /**
   * get raw data length.
   * - Array: length
   * - Object: keys.length
   * - otherwise: 0
   */
  get length(): number {
    if (this.data) {
      if (this.data instanceof Array) {
        return this.data.length;
      }
      return Object.keys(this.data).length;
    }
    return 0;
  }

  /**
   * Array only!
   *
   * get total pages of raw data by pageSize.
   * @param size page size
   */
  pages(size: number): number {
    if (this.data instanceof Array) {
      return Math.floor(this.data.length / size) + 1;
    }
    return 0;
  }
}

/**
 * Simple http GET JSON request pipe for angular template, display the ajax result quickly and lightly.
 *
 * ### Notice:
 * The result is a wrapper({@link Observable}&lt;{@link ResultWrapper}&gt;) of your result from the api, SO `get$` always work with `async` pipe.
 *
 * {@link ResultWrapper}: `{success: boolean, data?: any | any[], message: string, valid: boolean, ...}`
 *
 * {@link ResultWrapper#data}: your actual result.
 *
 * {@link ResultWrapper#valid}: `result.data` is not `null`, `undefined`, `length > 0`(Array) and `keys.length > 0`(Object).
 *
 * @usageNotes
 * `string | get$:{args}?:{options}?`
 * #### With args
 * ```shell
 * 'api' | get$ #actual request: api
 * 'api' | get$:{a:1,b:2} #actual request: api?a=1&b=2
 * 'api' | get$:{a:1,b:2}:{headers:{Authorization:xxx}} #actual request: api?a=1&b=2 with header {Authorization: xxx}
 * ```
 * #### Example
 * ```html
 * <ng-container *ngIf="'https://jsonplaceholder.typicode.com/todos' | get$ | async as result">
 *   <ul *ngIf="result.valid">
 *     <li *ngFor="let item of result.data">
 *       {{item.title}}
 *     </li>
 *   </ul>
 * </ng-container>
 * ```
 * @see ResultWrapper
 */
@Pipe({
  name: 'get$'
})
export class AjaxGetJsonPipe implements PipeTransform {
  constructor(private http: HttpClient) {
  }

  /**
   * Simple http GET JSON request pipe.
   * @param url url
   * @param args request arguments
   * @param options options
   */
  transform(url: string, args: { [index: string]: any } = {}, options: {} = {}): Observable<ResultWrapper> {
    const getUrl = Object.keys(args).length > 0 ? `${url}?${new URLSearchParams(args)}` : url;
    return this.http.get(getUrl, options).pipe(
      map(data => new ResultWrapper(true, data, 'requested!')),
      catchError(err => {
        console.error(err);
        return of(new ResultWrapper(false, null, err.message));
      })
    );
  }
}
