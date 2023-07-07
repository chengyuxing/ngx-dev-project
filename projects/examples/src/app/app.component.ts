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
          <button (click)="prevPage()">Prev page</button>&nbsp;&nbsp;
          <button (click)="nextPage(result.pages(10))">Next page</button>
      </ng-container>
  `,
  styles: []
})
export class AppComponent {
  page = 1;
  url = 'https://jsonplaceholder.typicode.com/todos';

  nextPage(pages: number) {
    if (this.page >= pages) {
      return;
    }
    this.page += 1;
  }

  prevPage() {
    if (this.page <= 1) {
      return;
    }
    this.page -= 1;
  }
}
