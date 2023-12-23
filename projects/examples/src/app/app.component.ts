import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <a [routerLink]="['pipes']">pipes</a>
      <a [routerLink]="['sidebar']">sidebar</a>
      <a [routerLink]="['tabs']">tabs</a>
      <div>
          <router-outlet></router-outlet>
      </div>
  `,
  styles: [
      `
          a {
              padding: 5px 8px;
          }
          div {
            padding: 10px;
          }
      `
  ]
})
export class AppComponent {

}
