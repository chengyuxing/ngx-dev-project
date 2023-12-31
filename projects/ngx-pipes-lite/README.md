# Ngx pipes lite

Useful pipes for angular v14+.

[Change notes](https://github.com/chengyuxing/ngx-dev-project/blob/main/projects/ngx-pipes-lite/CHANGE_NOTES.md).

## Try `get$` pipe.

Open [get$ with paging](https://stackblitz.com/edit/stackblitz-starters-tpdzxg?file=src%2Fmain.ts) pipes demo preview.

## Installation

1. Install: `npm i ngx-pipes-lite`
2. Add to module or standalone component:

```typescript
import {AjaxGetJsonPipe} from "ngx-pipes-lite";

@NgModule({
  // ...
  imports: [
    // ...
    AjaxGetJsonPipe
  ]
})
```

or

```typescript
import {AjaxGetJsonPipe} from "ngx-pipes-lite";

@Component({
  // ...
  imports: [
    AjaxGetJsonPipe
  ]
  // ...
})
export class AppComponent {

}
```

## Pipes

### get$

Simple **http GET JSON request pipe** for angular template, display the ajax result quickly and lightly.

The result is a wrapper(`Observable<ResultWrapper>`) of your result from the api, **SO `get$` always work with `async`
pipe**.
**ResultWrapper**: `Observable<{success: boolean, data?: any | any[], message: string, valid: boolean}>`

**ResultWrapper#data**: your actual result.

**ResultWrapper#valid**: `result.data` is not `null`, `undefined`, `length > 0`(array) and `{field:...}`(object).

**Usage:** `string | get$:{args}?:{options}?`

```shell
'api' | get$ # actual request: api
'api' | get$:{a:1,b:2} # actual request: api?a=1&b=2
'api' | get$:{a:1,b:2}:{headers:{Authorization:'xxx'}} # actual request: api?a=1&b=2 with header {Authorization: xxx}
```

```angular2html

<ng-container *ngIf="'https://jsonplaceholder.typicode.com/todos' | get$ | async as result">
    <ul *ngIf="result.valid">
        <li *ngFor="let item of result.dataAsArray">
            {{ item.title }}
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

> `HttpClientModule` is required.

### trunc

Truncate the long text.

**Usage:** `string | trunc:length?=15:replace?='...'`

```html
<p>{{'1234567890abcdef' | trunc}}</p>
<!-- string: 1234567890abcde... -->

<p>{{'abcde' | trunc:3}}</p>
<!-- string: abc... -->

<p>{{'abcde' | trunc:3:*}}</p>
<!-- string: abc* -->
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
<!-- number: Math.random() * 10 -->
```

### zip

collect each object values by key.

**Usage:** `any[] | zip`

```typescript
input = [
  {id: 1, name: 'cyx', age: 11},
  {id: 2, name: 'abc', age: 21},
  {id: 3, name: 'jack', age: 31}
]
```

```html
<p>{{input | zip}}</p>
<!--
{
  id: [1, 2, 3],
  name: ['cyx', 'abc', 'jack'],
  age: [11, 21, 31]
}
-->
```

### group

objects group by key's value.

**Usage:** `any[] | group:key`

```typescript
input = [
  {age: 11, name: 'cyx'},
  {age: 11, name: 'jack'},
  {age: 23, name: 'abc'}
]
```

```html
<p>{{input | group:'age'}}</p>
<!--
{
  11: [{age: 11, name: "cyx"}, {age: 11, name: "jack"}],
  23: [{age: 23, name: "abc"}]   
}
-->
```

### coalesce

Return first value which not null and not undefined.

**Usage:** `any[] | coalesce`

```html
<p>{{[null, 'b', 'c', 'd'] | coalesce}}</p>
<!--
'b'
-->
```
