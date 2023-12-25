import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map} from "rxjs";

/**
 * Sidebar menu item type.
 */
export interface IMenuItem {
  id: number | string;
  title: string;
  icon?: string;
  children?: IMenuItem[];
  data?: { [key: string]: any }
}

/**
 * Global menu item Search configuration type.
 */
export interface SearchConfig {
  placeHolder?: string;
  predicate?: (keyword: string, item: IMenuItem) => boolean;
}

/**
 * Simple basic menubar with step-into view display menu items(not tree view display).
 * ### Notice:
 * This component without animation while state changed, as you can define in your
 * custom parent element as more freedom.
 * @usageNotes
 * Example with width change animation:
 * ```html
 * <style>
 *   .container {
 *      width: 350px;
 *      height: 500px;
 *      transition: width .2s ease-out;
 *      box-shadow: 1px 2px 8px rgba(0, 0, 0, .45);
 *   }
 *   .container.close {
 *      width: 50px;
 *   }
 * </style>
 *
 * <div class="container" [class.close]="!menubar.isExpand">
 *  <cyx-menubar #menubar [datasource]="navs"></cyx-menubar>
 * </div>
 * ```
 * @see IMenuItem
 */
@Component({
  standalone: true,
  selector: 'cyx-menubar',
  templateUrl: 'cyx-menubar.component.html',
  imports: [
    BrowserAnimationsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['cyx-menubar.component.scss',
    'cyx-menubar.light.component.scss',
    'cyx-menubar.dark.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition(':leave, :enter', [animate(200)])
    ])
  ]
})
export class CyxMenubarComponent implements OnInit {
  /**
   * Default Top menu title.
   */
  @Input() title: string = 'Menu';
  /**
   * Menu items.
   */
  @Input() datasource: IMenuItem[] = [];
  /**
   * Theme color, 'dark' or 'light'.
   */
  @Input() color: string = 'dark';
  /**
   * Enable minimizable or not, if true (expand) will not work.
   */
  @Input() minimizable: boolean = true;
  /**
   * Show bottom doc panel.
   */
  @Input() enableDocPanel: boolean = false;
  /**
   * Parse icon which from menu item data field {@link IMenuItem#icon}, e.g.
   * ```javascript
   *  // menu item data.
   *  {id: 1, title: '...', icon: 'deployed_code'}
   *
   *  // font icon.
   *  icon => `<span class="material-symbols-sharp">${icon}</span>`
   *
   *  // svg icon.
   *  icon => `<svg viewBox="...">...</svg>`
   * ```
   * @param icon icon name.
   */
  @Input() iconParser: (icon: string) => string = (icon: string) => icon;
  /**
   * Global menu item search configuration.
   */
  @Input() searchConfig: SearchConfig = {
    placeHolder: 'search',
    predicate: (keyword, item) => item.title.toLowerCase().includes(keyword.toLowerCase())
  }
  /**
   * Sidebar display state change event.
   */
  @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Menu item click event.
   */
  @Output() itemClick: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

  protected indices: number[] = [];
  protected currentTitle?: string | null = null;
  protected currentChildren: IMenuItem[] = [];
  protected flattenItems: IMenuItem[] = [];
  /**
   * Selected item.
   */
  selectedItem: IMenuItem | null = null;
  /**
   * Is menubar expanded or not.
   */
  isExpand: boolean = true;

  private searchPredicate!: (keyword: string, item: IMenuItem) => boolean;

  private _displayItems: IMenuItem[] = [];
  protected get displayItems() {
    return this._displayItems;
  }

  /**
   * Is menu top level.
   */
  get isTopMenu(): boolean {
    return this.indices.length === 0;
  }

  get docDisplayClass(): string {
    return this.isExpand ? 'show' : 'hide';
  }

  protected readonly searchTerms = new BehaviorSubject<string>('');

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.currentChildren = this.datasource;
    this._displayItems = this.currentChildren;
    this.searchPredicate = this.searchConfig.predicate || (() => true);

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term.trim())
    ).subscribe(term => {
      if (term) {
        this._displayItems = this.flattenItems.filter(item => this.searchPredicate(term, item));
        return;
      }
      this._displayItems = this.currentChildren;
    });

    setTimeout(() => this.doFlatDatasource(this.datasource), 1);
  }

  private doFlatDatasource(datasource: IMenuItem[]) {
    const flatting = (items: IMenuItem[]): IMenuItem[] => {
      return items.reduce((acc: IMenuItem[], curr) => {
        if (curr.children && curr.children.length > 0) {
          acc.push({
            id: curr.id,
            title: curr.title,
            icon: curr.icon,
            data: curr.data
          });
          return acc.concat(flatting(curr.children));
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    this.flattenItems = flatting(datasource);
  }

  iconHTML(icon: string): SafeHtml {
    const iconHTMLString = this.iconParser(icon);
    return this.sanitizer.bypassSecurityTrustHtml(iconHTMLString);
  }

  protected clickItem(item: IMenuItem, index: number) {
    this.isExpand = true;
    this.selectedItem = item;
    if (item.children && item.children.length > 0) {
      this.indices.push(index);
      this.currentTitle = item.title;
      this.currentChildren = item.children;
      this._displayItems = this.currentChildren;
    }
    this.itemClick.emit(item);
  }

  backward() {
    if (this.isTopMenu) {
      this.toggleDisplay();
      return;
    }
    if (!this.isExpand) {
      this.toggleDisplay();
      return;
    }
    this.indices.pop();
    if (this.isTopMenu) {
      this.currentTitle = null;
      this.currentChildren = this.datasource;
      this._displayItems = this.currentChildren;
      return;
    }
    let prevItem: IMenuItem | null = null;
    let prevItems: IMenuItem[] = this.datasource;
    for (const index of this.indices) {
      prevItem = prevItems[index];
      prevItems = prevItem.children || [];
    }
    this.currentTitle = prevItem?.title;
    this.currentChildren = prevItems;
    this._displayItems = this.currentChildren;
  }

  toggleDisplay() {
    if (this.minimizable) {
      this.isExpand = !this.isExpand;
      this.expand.emit(this.isExpand);
    }
  }

  trackById(_: number, item: IMenuItem) {
    return item.id;
  }

  searchItems(value: string) {
    this.searchTerms.next(value);
  }
}
