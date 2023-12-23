import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {trigger, state, style, transition, animate} from "@angular/animations";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/**
 * Sidebar menu item type.
 */
export interface IMenuItem {
  id: number | string;
  title: string;
  children?: IMenuItem[];
  data?: { [key: string]: any }
}

/**
 * Simple basic sidebar with step-into view display menu items(not tree view display).
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
 * <div class="container" [class.close]="!sidebar.isStateMax">
 *  <cyx-sidebar #sidebar [datasource]="navs"></cyx-sidebar>
 * </div>
 * ```
 * @see IMenuItem
 */
@Component({
  standalone: true,
  selector: 'cyx-sidebar',
  templateUrl: 'cyx-sidebar.component.html',
  imports: [
    BrowserAnimationsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['cyx-sidebar.component.scss',
    'cyx-sidebar.light.component.scss',
    'cyx-sidebar.dark.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      transition(':leave, :enter', [animate(200)])
    ])
  ]
})
export class CyxSidebarComponent implements OnInit {
  /**
   * Menu items.
   */
  @Input() datasource: IMenuItem[] = [];
  /**
   * Theme color.
   */
  @Input() color: string = 'dark';
  /**
   * Show bottom doc panel.
   */
  @Input() enableDocPanel: boolean = false;
  /**
   * Sidebar display state change event.
   */
  @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Menu item click event.
   */
  @Output() itemClick: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

  protected indices: number[] = [];
  currentNavItem: IMenuItem | null = null;
  protected currentNavItemChildren: IMenuItem[] = [];
  /**
   * Is sidebar display state max or not.
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
      this.currentNavItemChildren = this.datasource;
    }
    return this.currentNavItemChildren;
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  clickItem(item: IMenuItem, index: number) {
    this.isExpand = true;
    this.currentNavItem = item;
    if (item.children && item.children.length > 0) {
      this.indices.push(index);
      this.currentNavItemChildren = this.currentNavItem.children || [];
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
      this.currentNavItem = null;
      this.currentNavItemChildren = this.datasource;
      return;
    }
    let prevNavItem: IMenuItem | null = null;
    let prevNavItems: IMenuItem[] = this.datasource;
    for (const index of this.indices) {
      prevNavItem = prevNavItems[index];
      prevNavItems = prevNavItem.children || [];
    }
    this.currentNavItem = prevNavItem;
    this.currentNavItemChildren = prevNavItems;
  }

  toggleDisplay() {
    this.isExpand = !this.isExpand;
    this.expand.emit(this.isExpand);
  }

  trackById(index: number, item: IMenuItem) {
    return item.id;
  }
}
