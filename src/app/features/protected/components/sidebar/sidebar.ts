import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Divider } from 'primeng/divider';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuStore } from '../../../../core/store/menu.store';
import { PanelMenu } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Badge } from 'primeng/badge';
import { Popover } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [
    Divider,
    Button,
    PanelMenu,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Popover,
    Badge,
    Tooltip,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  private readonly menuStore = inject(MenuStore);

  readonly menus = this.menuStore.menus;
  readonly currentItem = this.menuStore.selectedMenu;

  items: MenuItem[] = [];
  model: any[] = [];

  @ViewChild('op') op!: Popover;

  @Input() collapsed: boolean = false;
  @Input() expanded: boolean = false;
  @Input() width = '400px';

  @Output() selectMenuEvent = new EventEmitter<MenuItem[]>();

  constructor() {
    effect(() => {
      console.log('menus', this.menus());
    });
  }
  ngOnInit(): void {
    this.menuStore.initMenus();
  }

  toggle(event: any) {
    this.op.toggle(event);
  }

  selectMenuEmitter(menu: MenuItem) {
    if (menu['parentId']) {
      const parent = this.items.find((item) => item.id === menu['parentId']);
      if (parent) {
        const newMenuFormat = [parent, menu];
        console.log('newMenuFormat', newMenuFormat);
        this.selectMenuEvent.emit(newMenuFormat);
      }
    } else {
      this.selectMenuEvent.emit([menu]);
    }
  }

  onMenuSelect = (item: any, isShortMenu?: boolean) =>
    this.menuStore.onMenuSelected(item);

  private toggleSelectMenuRecursive(
    items: MenuItem[],
    selectedMenu: MenuItem
  ): MenuItem[] {
    const newItems = items.map((menuItem) => {
      if (menuItem.id === selectedMenu.id) {
        // if (!menuItem.items) {
        // menuItem.expanded = true;
        // }
      } else {
        if (!menuItem.items) {
          menuItem.expanded = false;
        }
      }

      if (menuItem.items) {
        menuItem.items = this.toggleSelectMenuRecursive(
          menuItem.items,
          selectedMenu
        );
      }
      return menuItem;
    });

    return newItems;
  }

  isCurrentItem(item: MenuItem) {
    if (item.items) {
      //return item.items.some((child) => child.id === this.currentItem()?.id);
      return false;
    }
    return item.id === this.currentItem()?.id;
  }

  isChildCurrentItem(item: MenuItem): boolean {
    if (item.items) {
      return item.items.some((child) => child.id === this.currentItem()?.id);
    }

    return false;
  }

  toggleExpanded() {
    const lastState = this.expanded;
    this.expanded = !this.expanded;

    if (lastState) {
      this.width = '60px';
    } else {
      this.width = '320px';
    }
  }

  toggleAll() {
    const expanded = !this.areAllItemsExpanded();
    this.items = this.toggleAllRecursive(this.items, expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
    return items.map((menuItem) => {
      menuItem.expanded = expanded;
      if (menuItem.items) {
        menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
      }
      return menuItem;
    });
  }

  private areAllItemsExpanded(): boolean {
    return this.items.every((menuItem) => menuItem.expanded);
  }
}
