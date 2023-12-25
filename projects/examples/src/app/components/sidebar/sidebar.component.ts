import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
      <div class="sidebar" [class.close]="!sidebar.isExpand">
          <cyx-menubar #sidebar [title]="'政务管理系统'" [enableDocPanel]="true" color="dark"
                       [datasource]="navs"
                       [iconParser]="parseSvfIcon"
                       (itemClick)="clickItem($event)"
                       (expand)="stateChanged($event)">
              {{ item | json }}
          </cyx-menubar>
      </div>
  `,
  styles: [
    `
      .sidebar {
        width: 350px;
        height: 500px;
        transition: width .2s ease-out;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, .45);
      }

      .sidebar.close {
        width: 50px;
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
