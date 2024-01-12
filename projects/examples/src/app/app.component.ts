import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <a [routerLink]="['pipes']">pipes</a>
      <a [routerLink]="['sidebar']">sidebar</a>
      <a [routerLink]="['tabs']">tabs</a>
      <div class="abc">
          <router-outlet></router-outlet>
      </div>
  `,
  styles: [
      `
        .abc {
          height: 700px;
        }

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
