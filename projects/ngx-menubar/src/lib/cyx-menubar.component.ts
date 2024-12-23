import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {BehaviorSubject, debounceTime, distinctUntilChanged, map} from "rxjs";

/**
 * Menubar menu item type.
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
 * @usageNotes
 * ```html
 * <style>
 *   .container {
 *      width: 350px;
 *      height: 500px;
 *      box-shadow: 1px 2px 8px rgba(0, 0, 0, .45);
 *   }
 * </style>
 *
 * <div class="container">
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
    CommonModule
  ],
  styleUrls: ['cyx-menubar.component.scss',
    'cyx-menubar.light.component.scss',
    'cyx-menubar.dark.component.scss']
})
export class CyxMenubarComponent implements OnInit, OnChanges {
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
   * Show bottom doc panel.
   */
  @Input() showDocPanel: boolean = false;
  /**
   * Show menu icon.
   */
  @Input() showMenuIcon: boolean = true;
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
   * Active item id.
   */
  @Input() active?: number | string;
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

  protected readonly searchTerms = new BehaviorSubject<string>('');

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasource']) {
      this.doFlatDatasource(this.datasource);
    }
    if (changes['active'] && this.active) {
      this.doActiveItemById(this.active);
    }
  }

  ngOnInit(): void {
    this.doFlatDatasource(this.datasource);
    if (this.active) {
      this.doActiveItemById(this.active);
    } else {
      this.currentChildren = this.datasource;
      this._displayItems = this.currentChildren;
    }
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
  }

  protected doActiveItemById(id: number | string) {
    const activeItem = this.flattenItems.find(i => i.id === id);
    if (activeItem) {
      this.currentChildren = [activeItem];
      this._displayItems = this.currentChildren;
    }
  }

  private doFlatDatasource(datasource: IMenuItem[]) {
    const flatting = (items: IMenuItem[]): IMenuItem[] => {
      return items.reduce((acc: IMenuItem[], curr) => {
        if (curr.children && curr.children.length > 0) {
          acc.push({
            id: curr.id,
            title: curr.title,
            icon: curr.icon,
            data: curr.data,
            children: curr.children,
          });
          return acc.concat(flatting(curr.children));
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    this.flattenItems = flatting(datasource);
  }

  protected iconHTML(icon: string): SafeHtml {
    const iconHTMLString = this.iconParser(icon);
    return this.sanitizer.bypassSecurityTrustHtml(iconHTMLString);
  }

  protected clickItem(item: IMenuItem, index: number) {
    this.selectedItem = item;
    if (item.children && item.children.length > 0) {
      this.indices.push(index);
      this.currentTitle = item.title;
      this.currentChildren = item.children;
      this._displayItems = this.currentChildren;
    }
    this.itemClick.emit(item);
  }

  protected backward() {
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

  protected trackById(_: number, item: IMenuItem) {
    return item.id;
  }

  protected searchItems(value: string) {
    this.searchTerms.next(value);
  }
}
