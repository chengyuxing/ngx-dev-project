import {Component, OnInit} from '@angular/core';
import {IMenuItem} from "../../../../../ngx-menubar/src/lib/cyx-menubar.component";

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="container">
      <aside [class.close]="!menubar.isExpand">
        <cyx-menubar
          #menubar
          [datasource]="navs"
          [iconParser]="parseSvfIcon"
          [enableDocPanel]="true"
          [color]="'dark'">
          {{ menubar.selectedItem | json }}
          <br>
          Initial Chunk Files | Names | Raw Size
          main.js | main | 90.53 kB |
          runtime.js | runtime | 6.51 kB |
        </cyx-menubar>
      </aside>
      <div class="content">
        <pre>
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
      </div>
    </div>

  `,
  styles: [
    `
      .container {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: stretch;
        height: 500px;
      }
      aside {
        flex: 1 0 300px;
        width: 300px;
        transition: flex 0.2s ease-out;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.45);
      }

      aside.close {
        flex: 0 50px;
      }

      .content {
        flex: 8 800px;
        display: flex;
        flex-flow: column;
        padding: 10px;
      }

    `
  ]
})
export class SidebarComponent implements OnInit {
  navs: IMenuItem[] = [
    {id: 1, title: 'runtime', icon: 'deployed_code', children: []},
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

  stateChanged(state: boolean) {
    this.sidebarState = state;
    console.log(state);
  }

  parseSvfIcon(icon: string): string {
    return `<span class="material-symbols-sharp">${icon}</span>`;
  }
}
