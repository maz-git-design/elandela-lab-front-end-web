import { MenuItem } from "primeng/api";

export function toggleSelectMenuRecursive(items: MenuItem[], selectedMenu: MenuItem): MenuItem[] {
  const newItems = items.map(menuItem => {
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
      menuItem.items = toggleSelectMenuRecursive(menuItem.items, selectedMenu);
    }
    return menuItem;
  });

  return newItems;
}
