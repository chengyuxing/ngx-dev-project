# Ngx pipes lite

Useful pipes for angular v14+.

## Try `get$` pipe.

Open [get$ with paging](https://stackblitz.com/edit/stackblitz-starters-tpdzxg?file=src%2Fmain.ts) pipes demo preview.

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

Simple **http GET JSON request pipe** for angular template, display the ajax result quickly and lightly.

The result is a wrapper(`Observable<ResultWrapper>`) of your result from the api, **SO `get$` always work with `async` pipe**.
**ResultWrapper**: `Observable<{success: boolean, data?: any | any[], message: string, valid: boolean}>`

**ResultWrapper#data**: your actual result.

**ResultWrapper#valid**: `result.data` is not `null`, `undefined`, `length > 0`(array) and `{field:...}`(object).

**Usage:** `string | get$:{args}?:{options}?`

```javascript
'api' | get$ // actual request: api
'api' | get$:{a:1,b:2} // actual request: api?a=1&b=2
'api' | get$:{a:1,b:2}:{headers:{Authorization:'xxx'}} // actual request: api?a=1&b=2 with header {Authorization: xxx}
```

```angular2html
<ng-container *ngIf="'https://jsonplaceholder.typicode.com/todos' | get$ | async as result">
  <ul *ngIf="result.valid">
    <li *ngFor="let item of result.data">
      {{item.title}}
    </li>
  </ul>
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

**Usage:** `string | trunc:length?=15:replace?='...'`

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

### math

Math pipe of javascript `Math` .

The input args of 1 number or number array depends on Math function.

**Usage:** `number` | `number[] | math:Func`

```html
<p>{{[2, 3] | math:'pow'}}</p>
<!-- number: 8 -->

<p>{{[1, 2, 3] | math:'sum'}}</p>
<!-- number: 6 -->

<p>{{1.5 | math:'floor'}}</p>
<!-- number: 1 -->

<!-- Additional -->
<p>{{10 | math:'randomx'}}</p>
<!-- number: Math.random * 10 -->
```

