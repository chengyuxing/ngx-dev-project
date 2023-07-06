# Ngx pipes lite

Useful pipes for angular v14+.

## Installation

1. Install: `npm i ngx-pipes-lite`
2. Add to module:

```typescript
import {NgxPipesLiteModule} from "ngx-pipes-lite";

@NgModule({
  // ...
  imports: [
    // ...
    NgxPipesLiteModule
  ]
})
```

## Pipes

### get$

Simple **http GET request pipe** for angular template, display the ajax result quickly and lightly.

The result is a wrapper(`Observable<Result>`) of your result from the api, **SO `get$` always work with `async` pipe**.
**Result**: `Observable<{success: boolean, data?: any | any[], message: string, valid: boolean}>`
**Result#data**: your actual result.
**Result#valid**: `result.data` is not `null`, `undefined`, `length > 0`(array) and `{field:...}`(object).

**Usage:** `string | get$:{args}?:{headers}?`

```javascript
'api' | get$ // actual request: api
'api' | get$:{a:1,b:2} // actual request: api?a=1&b=2
'api' | get$:{a:1,b:2}:{Authorization:xxx} // actual request: api?a=1&b=2 with header {Authorization: xxx}
```

```angular2html
<ng-container *ngIf="'https://jsonplaceholder.typicode.com/todos' | get$ | async as result">
  <ng-container *ngIf="result.valid">
    <p *ngFor="let item of result.data">
      {{item.title}}
    </p>
  </ng-container>
</ng-container>

<!-- 
<p>delectus aut autem</p>
<p>quis ut nam facilis et officia qui</p>
<p>fugiat veniam minus</p>
... 
-->
```

### trunc

Truncate the long text.

**Usage:** `string | trunc:length?=15: replace?='...'`

```html
<p>{{'1234567890abcdef' | trunc}}</p> 
<!-- string: 1234567890abcde... -->

<p>{{'abcde' | trunc:3}}</p> 
<!-- string: tru... -->

<p>{{'abcde' | trunc:3:*}}</p> 
<!-- string: tru* -->
```

### paging

Simple array data paging pipe.

**Usage:** `[] | paging:page?=1:size?=10`

```html
<p>{{[1,2,3,4,5,6,7,8,9,10] | paging}}</p> 
<!-- Array: [1,2,3,4,5,6,7,8,9,10] -->

<p>{{[1,2,3,4,5,6,7,8,9,10] | paging:2:3}}</p> 
<!-- Array: [4,5,6] -->
```

