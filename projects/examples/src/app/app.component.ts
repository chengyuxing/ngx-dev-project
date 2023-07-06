import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title | trunc:8}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo"
           src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul *ngIf="url | get$ | async as result">
      <ng-container *ngIf="result.valid">
        <li *ngFor="let item of result.data | paging:currentPage">
          {{item.id}}. {{item.title}}
        </li>
      </ng-container>
    </ul>
    <button (click)="prevPage()">Prev page</button>&nbsp;&nbsp;
    <button (click)="nextPage()">Next page</button>
  `,
  styles: []
})
export class AppComponent {
  currentPage = 1;
  title = 'Hello world';
  url = 'https://jsonplaceholder.typicode.com/todos';

  nextPage() {
    this.currentPage += 1;
  }

  prevPage() {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage -= 1;
  }
}
