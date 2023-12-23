import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {trigger, state, style, transition, animate} from "@angular/animations";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
 * Simple basic menubar with step-into view display menu items(not tree view display).
 * ### Notice:
 * This component without animation while state changed, as you can define in your
 * custom parent element as more freedom.
 * @usageNotes
 * Example with width change animation:
 * ```html
 * <style>
 *   .container {
 *      width: 300px;
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
export class CyxMenubarComponent {
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
  @Input() iconParser: Function = (icon: string) => icon;
  /**
   * Sidebar display state change event.
   */
  @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Menu item click event.
   */
  @Output() itemClick: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

  protected indices: number[] = [];
  currentItem: IMenuItem | null = null;
  protected currentItemChildren: IMenuItem[] = [];
  /**
   * Is menubar expanded or not.
   */
  isExpand: boolean = true;

  /**
   * Is menu top level.
   */
  get isTopMenu(): boolean {
    return this.indices.length === 0;
  }

  get docDisplayClass(): string {
    return this.isExpand ? 'show' : 'hide';
  }

  protected get displayNavItems() {
    if (this.isTopMenu) {
      this.currentItemChildren = this.datasource;
    }
    return this.currentItemChildren;
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  iconHTML(icon: string): SafeHtml {
    const iconHTMLString = this.iconParser(icon);
    return this.sanitizer.bypassSecurityTrustHtml(iconHTMLString);
  }

  clickItem(item: IMenuItem, index: number) {
    this.isExpand = true;
    this.currentItem = item;
    if (item.children && item.children.length > 0) {
      this.indices.push(index);
      this.currentItemChildren = this.currentItem.children || [];
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
      this.currentItem = null;
      this.currentItemChildren = this.datasource;
      return;
    }
    let prevItem: IMenuItem | null = null;
    let prevItems: IMenuItem[] = this.datasource;
    for (const index of this.indices) {
      prevItem = prevItems[index];
      prevItems = prevItem.children || [];
    }
    this.currentItem = prevItem;
    this.currentItemChildren = prevItems;
  }

  toggleDisplay() {
    this.isExpand = !this.isExpand;
    this.expand.emit(this.isExpand);
  }

  trackById(index: number, item: IMenuItem) {
    return item.id;
  }
}
