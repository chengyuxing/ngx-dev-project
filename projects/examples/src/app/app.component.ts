import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <h2>Pipes Demo</h2>
      <ng-container *ngIf="url | get$ | async as result">
          <ul *ngIf="result.valid">
              <li *ngFor="let item of result.data | paging:page">
                  {{item.id}}. {{item.title | trunc:30}}
              </li>
          </ul>
          <button (click)="prev()">Prev page</button>&nbsp;&nbsp;
          <button (click)="next(result.pages(10))">Next page</button>
      </ng-container>
      <p>{{5 | math:'sqrt' | math:'floor'}}</p>
      <pre>{{objects | zip | json}}</pre>
  `,
  styles: []
})
export class AppComponent {
  page = 1;
  url = 'https://jsonplaceholder.typicode.com/todos';
  objects = [
    {id: 1, name: 'cyx', age: 11},
    {id: 2, name: 'abc', age: 21},
    {id: 3, name: 'jack', age: 31},
    {id: 4, name: 'qq', age: 34},
    {id: 5, name: 'mike', age: 10},
    {id: 6, name: 'lisa', age: 18},
  ]

  next(pages: number) {
    if (this.page >= pages) {
      return;
    }
    this.page += 1;
  }

  prev() {
    if (this.page <= 1) {
      return;
    }
    this.page -= 1;
  }
}
