import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { MenuItem } from 'primeng/api';
import { computed, inject } from '@angular/core';
import { toggleSelectMenuRecursive } from '../../core/helper/menu.helper';
import { Router } from '@angular/router';

interface MenuState {
  menus: MenuItem[];
  selectedMenu: MenuItem;
  loaded: boolean;
}

export const initialState: MenuState = {
  menus: [],
  selectedMenu: {
    id: 'dashboard',
    label: 'dashboard',
    expanded: true,
    route: ['/protected/dashboard'],
    icon: 'pi pi-th-large',
    routerLinkActiveOptions: { exact: false },
  },
  loaded: false,
};

export const MenuStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withStorageSync({
  //   key: 'menu-key', // key used when writing to/reading from storage
  //   autoSync: true, // read from storage on init and write on state changes - `true` by default
  //   select: (state: MenuState) => ({
  //     selectedMenu: state.selectedMenu,
  //   }),
  //   storage: () => sessionStorage, // factory to select storage to sync with
  // }),
  withComputed((store) => ({
    getMenuList: computed(() => {
      // if (!store.selectedMenu()) {
      //   return [];
      // }
      // if (store.selectedMenu()! && store.selectedMenu()!['parentId']) {
      //   const parent = store
      //     .menus()
      //     .find((item) => item.id === store.selectedMenu()!['parentId']);
      //   if (parent) {
      //     const newMenuFormat = [parent, store.selectedMenu()];
      //     return newMenuFormat;
      //   }
      //   return [store.selectedMenu()];
      // } else {
      //   return [store.selectedMenu()];
      // }
    }),
  })),
  withMethods((store, router = inject(Router)) => {
    function initMenus() {
      const fetchedMenus: MenuItem[] = [
        {
          id: 'dashboard',
          label: 'Dashboard',
          expanded: true,
          route: ['/protected/dashboard'],
          icon: 'fas fa-house',
          routerLinkActiveOptions: { exact: false },
          command: (e) => onMenuSelected(e.item!),
          visible: true,
        },
        {
          id: 'labs',
          label: 'Laboratoires',
          icon: 'fas fa-flask',
          route: ['/protected/labs'],
          routerLinkActiveOptions: { exact: true },
          command: (e) => onMenuSelected(e.item!),
          visible: true,
        },
        {
          id: 'reservations',
          label: 'Reservations',
          icon: 'fas fa-calendar-check',
          route: ['/protected/reservations'],
          routerLinkActiveOptions: { exact: true },
          command: (e) => onMenuSelected(e.item!),
          visible: true,
        },
        {
          id: 'attendances',
          label: 'Présences',
          icon: 'fas fa-user-check',
          route: ['/protected/attendances'],
          routerLinkActiveOptions: { exact: true },
          command: (e) => onMenuSelected(e.item!),
          visible: true,
        },
        {
          id: 'equipments',
          label: 'Equipements',
          icon: 'fas fa-desktop',
          route: ['/protected/equipments'],
          routerLinkActiveOptions: { exact: true },
          command: (e) => onMenuSelected(e.item!),
          visible: true,
        },
        {
          id: 'users',
          label: 'Utilisateurs',
          icon: 'fas fa-user-group',
          route: ['/protected/users'],
          routerLinkActiveOptions: { exact: true },
          command: (e) => onMenuSelected(e.item!),
          visible: true,
        },
        {
          id: 'administration',
          label: 'Administration',
          icon: 'fas fa-toolbox',
          command: (e) => onMenuSelected(e.item!),
          items: [
            {
              id: 'activity',
              label: 'Activités',
              route: ['/protected/administrations/activities'],
              icon: 'fas fa-clipboard-list',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'administration',
              visible: true,
            },
            {
              id: 'cohort',
              label: 'Cohortes',
              route: ['/protected/administrations/cohorts'],
              icon: 'fas fa-users-viewfinder',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'administration',
              visible: true,
            },
            {
              id: 'department',
              label: 'Departements',
              route: ['/protected/administrations/departments'],
              icon: 'fas fa-building',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'administration',
              visible: true,
            },
            {
              id: 'equipment-category',
              label: 'Types Equipement',
              route: ['/protected/administrations/equipment-categories'],
              icon: 'fas fa-boxes',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'administration',
              visible: true,
            },
            {
              id: 'academic-year',
              label: 'Années académiques',
              route: ['/protected/administrations/academic-years'],
              icon: 'fas fa-calendar-alt',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'administration',
              visible: true,
            },
          ],
          visible: true,
        },
        {
          id: 'access',
          label: 'Gestion des accès',
          icon: 'fas fa-unlock-keyhole',
          command: (e) => onMenuSelected(e.item!),
          items: [
            {
              id: 'module',
              label: 'Modules',
              route: ['/protected/accesses/modules'],
              icon: 'fas fa-list',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'access',
              visible: true,
            },
            {
              id: 'role',
              label: 'Rôles',
              route: ['/protected/accesses/roles'],
              icon: 'fas fa-user-gear',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'access',
              visible: true,
            },
            {
              id: 'permission',
              label: 'Permissions',
              route: ['/protected/accesses/permissions'],
              icon: 'fas fa-lock-open',
              routerLinkActiveOptions: { exact: true },
              command: (e) => onMenuSelected(e.item!),
              parentId: 'access',
              visible: true,
            },
          ],
          visible: true,
        },
      ];

      patchState(store, {
        menus: fetchedMenus,
        selectedMenu: store.selectedMenu() ?? fetchedMenus[0],
        loaded: true,
      });
    }

    function resetSelectedMenu() {
      patchState(store, { selectedMenu: store.menus()[0] });
    }

    function unselectMenu() {
      patchState(store, { selectedMenu: undefined });
    }

    function onMenuSelected(menuItem: MenuItem) {
      const newMenus = toggleSelectMenuRecursive(store.menus(), menuItem);

      patchState(store, { menus: newMenus });

      if (!menuItem.items) {
        patchState(store, { selectedMenu: menuItem });
        router.navigate(menuItem['route']);
      }
    }

    function onMenuSelectedById(menuItemId: string) {
      const menuItem = store.menus().find((item) => item.id === menuItemId);
      if (menuItem) {
        onMenuSelected(menuItem);
      }
    }

    function reset() {
      patchState(store, initialState);
    }

    return {
      initMenus,
      onMenuSelected,
      reset,
      resetSelectedMenu,
      unselectMenu,
      onMenuSelectedById,
    };
  })
);
