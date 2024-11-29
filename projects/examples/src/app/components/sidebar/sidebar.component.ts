import {Component, OnInit} from '@angular/core';
import {IMenuItem} from "../../../../../ngx-menubar/src/lib/cyx-menubar.component";

@Component({
  selector: 'app-sidebar',
  template: `
    <mat-drawer-container class="container" autosize>
      <mat-drawer #drawer mode="side" opened>
        <nav>
          <cyx-menubar
            #menubar
            [datasource]="navs"
            [iconParser]="parseSvfIcon"
            [showDocPanel]="true"
            [showMenuIcon]="true"
            [color]="'dark'"
            (itemClick)="clickItem($event)">
            {{ menubar.selectedItem | json }}
            <div>
              Initial Chunk Files | Names | Raw Size
              main.js | main | 90.53 kB |
              runtime.js | runtime | 6.51 kB |
            </div>
          </cyx-menubar>
        </nav>
      </mat-drawer>
      <mat-drawer-content>
        <main class="content">
            <pre (click)="drawer.toggle()">
  Build at: 2023-12-29T03:22:17.122Z - Hash: 48125fe696ac6cf7 - Time: 170ms

  ✔ Compiled successfully.
  ✔ Browser application bundle generation complete.

  Initial Chunk Files | Names   | Raw Size
  main.js             | main    | 90.53 kB |
  runtime.js          | runtime |  6.51 kB |

  3 unchanged chunks

  Build at: 2023-12-29T03:22:51.314Z - Hash: e0a24afe57e23719 - Time: 168ms

  ✔ Compiled successfully.
        </pre>
        </main>
      </mat-drawer-content>
    </mat-drawer-container>

  `,
  styles: [
    `
      .container {
        width: auto;
        height: 100%;
      }

      mat-drawer {
        width: 300px;

        nav {
          width: 298px;
          height: 100%;
        }
      }

      .content {
        height: 100%;
      }

    `
  ]
})
export class SidebarComponent implements OnInit {
  navs: IMenuItem[] = [
    {id: 1, title: 'runtime', icon: '', children: []},
    {
      id: 2, title: 'main', children: [
        {id: 5, title: 'app-routing.module.ts', children: []},
        {id: 6, title: 'app.module.ts', children: []},
        {id: 7, title: 'app.component.ts', children: []}
      ]
    },
    {
      id: 32, title: 'Some ID', children: [
        {id: 52, title: 'f44989d1b76d2fee', children: []},
        {id: 62, title: 'runtime.js', children: []},
        {id: 72, title: 'application', children: []},
        {id: 52, title: '2023-12-20T08:07:37.396Z', children: []},
        {
          id: 61, title: 'Browser', children: [
            {
              id: 51, title: 'Chrome', data: {url: 'https://www.google.cn/intl/zh-CN/chrome/?standalone=1'}, children: [
                {id: 50, title: '49.0', children: []},
                {id: 61, title: '61.5', children: []},
                {id: 71, title: '120.1', children: []},
              ]
            },
            {id: 65, title: 'Safari', children: []},
            {id: 75, title: 'Firefox', children: []}
          ]
        },
        {id: 79, title: 'tsconfig.app.json', children: []}
      ]
    },
    {id: 49, title: 'application', children: []}
  ];

  sidebarState = true;
  item: IMenuItem | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  clickItem(item: IMenuItem) {
    this.item = item;
    console.log(item);
  }

  parseSvfIcon(icon: string): string {
    return `<span class="material-symbols-sharp">${icon}</span>`;
  }
}
