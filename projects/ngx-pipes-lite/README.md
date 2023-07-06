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

### json$

Simple http GET request pipe for angular template, display the ajax result quickly and lightly.

The result is a wrapper(`Observable<Result>`) of your result from the api.
**Result**: `{success: boolean, data?: any | any[], message: string, isNotEmpty: boolean}`
**Result#data**: your actual result.
**Result#valid**: `result.data` is not `null`, `undefined`, `length > 0`(array) and `{field:...}`(object).

**Usage:** `string | json$:{args}?:{headers}?`

**With args**

```typescript
'api' | json$:{a:1,b:2} // actual request: api?a=1&b=2
'api' | json$:{a:1,b:2}:{Authorization:xxx} // actual request: api?a=1&b=2 with header {Authorization: xxx}
```

```html
<ng-container *ngIf="'https://jsonplaceholder.typicode.com/todos' | json$ | async as result">
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

