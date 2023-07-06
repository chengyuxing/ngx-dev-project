import {Pipe, PipeTransform} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

/**
 * json$ pipe result wrapper.
 */
export class ResultWrapper {
  readonly success: boolean = false;
  readonly data?: any | any[];
  readonly message?: string;

  constructor(success: boolean, data: any | any[], message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  /**
   * if ajax request result is empty or null returns false, else returns true.
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
}

/**
 * Simple http GET request pipe for angular template, display the ajax result quickly and lightly.
 *
 * `Syntax: string | json$:{args}?:{headers}?`
 *
 * ### Notice:
 * The result is a wrapper(Observable<Result>) of your result from the api.
 *
 * Result: `{success: boolean, data?: any | any[], message: string, isNotEmpty: boolean}`
 *
 * Result#data: your actual result.
 *
 * Result#valid: `result.data` is not `null`, `undefined`, `length > 0`(array) and `{field:...}`(object).
 *
 * @usageNotes
 * #### With args
 * ```javascript
 * 'api' | json$:{a:1,b:2} // actual request: api?a=1&b=2
 * 'api' | json$:{a:1,b:2}:{Authorization:xxx} // actual request: api?a=1&b=2 with header {Authorization: xxx}
 * ```
 * #### Example
 * ```html
 * <ng-container *ngIf="'https://jsonplaceholder.typicode.com/todos' | json$ | async as result">
 *   <ng-container *ngIf="result.valid">
 *     <p *ngFor="let item of result.data">
 *       {{item.title}}
 *     </p>
 *   </ng-container>
 * </ng-container>
 * ```
 * @see Result
 */
@Pipe({
  name: 'json$'
})
export class AjaxGetJsonPipe implements PipeTransform {
  constructor(private http: HttpClient) {
  }

  /**
   * Simple http GET request pipe.
   * @param url url
   * @param args request arguments
   * @param headers http headers
   */
  transform(url: string, args: { [index: string]: any } = {}, headers: {
    [index: string]: string
  } = {}): Observable<ResultWrapper> {
    const getUrl = Object.keys(args).length > 0 ? `${url}?${new URLSearchParams(args)}` : url;
    return this.http.get(getUrl, {headers: headers}).pipe(
      map(data => new ResultWrapper(true, data, 'requested!')),
      catchError(err => {
        console.error(err);
        return of(new ResultWrapper(false, null, err.message));
      })
    );
  }
}
