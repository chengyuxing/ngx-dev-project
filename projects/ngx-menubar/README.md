# Ngx Menubar component

Simple basic menubar with step-into view display menu items(not tree view display).

This component without size change while state changed, as you can define in your
custom parent element as more freedom.

Open [Menubar](https://stackblitz.com/edit/stackblitz-starters-pnujrb?file=src%2Fmain.ts) demo preview.

## Installation

1. Install: `npm i ngx-menubar`;

2. Add to module or standalone component:

   ```typescript
   import {CyxMenubarComponent} from "ngx-menubar";
   
   @NgModule({
     // ...
     imports: [
       // ...
       CyxMenubarComponent
     ]
   })
   ```

   or

   ```typescript
   import {CyxMenubarComponent} from "ngx-menubar";
   
   @Component({
     // ...
     imports: [
       CyxMenubarComponent
     ]
     // ...
   })
   export class AppComponent {
   
   }
   ```

## Example

`app.component.css`

```css
.container {
  width: 350px;
  height: 500px;
  transition: width .2s ease-out;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, .45);
}

.container.close {
  width: 50px;
}
```

`app.component.html`

```html

<div class="container" [class.close]="!menubar.isExpand">
  <cyx-menubar #menubar [datasource]="items">
    <!-- some elements can be here if property 'enableDocPanel' set to true. -->
  </cyx-menubar>
</div>
```

`app.component.ts`

```typescript
@Component({...})
export class AppComponent {
  items: IMenuItem[] = [
    {id: 1, title: 'runtime', icon: 'deployed_code', children: []},
    {
      id: 2, title: 'main', children: [
        {id: 5, title: 'app-routing.module.ts', children: []},
        {id: 6, title: 'app.module.ts', children: []},
        {id: 7, title: 'app.component.ts', children: []}
      ]
    },
    //...
  ]
}
```

## Directives

| Name                                                 | Default value                 | Description                                                  |
|------------------------------------------------------|-------------------------------|--------------------------------------------------------------|
| @Input() title: string                               | 'Menu'                        | Default Top menu title.                                      |
| @Input() datasource: [IMenuItem](#IMenuItem)[]       | []                            | Menu items.                                                  |
| @Input() color: string                               | 'dark'                        | Theme color, 'dark' or 'light'.                              |
| @Input() minimizable: boolean                        | true                          | Enable minimizable or not, if false (expand) will not work.  |
| @Input() enableDocPanel: boolean                     | false                         | Show bottom doc panel.                                       |
| @Input() [iconParser](#IconParser): Function         | (icon: string) => icon        | Parse icon which from menu item data field `IMenuItem#icon`. |
| @Input() searchConfig: [SearchConfig](#SearchConfig) | [{...}](#DefaultSearchConfig) | Global menu item search configuration.                       |
| @Output() expand: EventEmitter&lt;boolean&gt;        |                               | Menubar display state change event.                          |
| @Output() itemClick: EventEmitter&lt;IMenuItem&gt;   |                               | Menu item click event.                                       |

## Properties

| Name                    | Default value | Description                   |
|-------------------------|---------------|-------------------------------|
| selectedItem: IMenuItem | null          | Selected item.                |
| isExpand: boolean       | true          | Is menubar expanded or not.   |
| `get` isTopMenu         | true          | Is menu top level.            |
| `get` docDisplayClass   | 'hide'        | Doc panel display class name. |

## Appendix

### IconParser

Example of parse icon name to icon html.

```javascript
// menu item data.
// {id: 1, title: '...', icon: 'deployed_code'}

// font icon.
icon => `<span class="material-symbols-sharp">${icon}</span>`
// svg icon.
icon => `<svg viewBox="...">...</svg>`
```

### IMenuItem

Menubar menu item type.

```typescript
export interface IMenuItem {
  id: number | string;
  title: string;
  icon?: string;
  children?: IMenuItem[];
  data?: { [key: string]: any }
}
```

### SearchConfig

```typescript
export interface SearchConfig {
  placeHolder?: string;
  predicate?: (keyword: string, item: IMenuItem) => boolean;
}
```

#### DefaultSearchConfig

```typescript
{
  placeHolder: 'search',
    predicate
:
  (keyword, item) => item.title.toLowerCase().includes(keyword.toLowerCase())
}
```
