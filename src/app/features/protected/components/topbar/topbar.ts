import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { Router, NavigationEnd } from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  read: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
}

interface UserMenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
  separator?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, FormsModule, Button, InputText, Popover, Tooltip, Breadcrumb],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  @ViewChild('notificationsPopover') notificationsPopover!: Popover;
  @ViewChild('quickActionsPopover') quickActionsPopover!: Popover;
  @ViewChild('userMenuPopover') userMenuPopover!: Popover;

  searchQuery: string = '';
  notificationCount: number = 3;
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'fas fa-home', routerLink: '/protected/dashboard' };

  notifications: Notification[] = [
    {
      id: '1',
      title: 'Nouveau laboratoire',
      message: 'Le laboratoire de Chimie Organique a été créé',
      time: 'Il y a 2h',
      icon: 'fas fa-flask',
      read: false
    },
    {
      id: '2',
      title: 'Maintenance programmée',
      message: 'Microscope #MS-001 en maintenance demain',
      time: 'Il y a 4h',
      icon: 'fas fa-wrench',
      read: false
    },
    {
      id: '3',
      title: 'Nouvel utilisateur',
      message: 'Marie Dubois a rejoint l\'équipe',
      time: 'Il y a 1j',
      icon: 'fas fa-user-plus',
      read: false
    }
  ];

  quickActions: QuickAction[] = [
    {
      id: 'new-lab',
      label: 'Nouveau Laboratoire',
      icon: 'fas fa-flask',
      route: '/protected/labs'
    },
    {
      id: 'new-user',
      label: 'Ajouter Utilisateur',
      icon: 'fas fa-user-plus',
      route: '/protected/users'
    },
    {
      id: 'new-equipment',
      label: 'Nouvel Équipement',
      icon: 'fas fa-desktop',
      route: '/protected/equipments'
    },
    {
      id: 'view-reports',
      label: 'Voir les Rapports',
      icon: 'fas fa-chart-bar',
      route: '/protected/reports'
    }
  ];



  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateBreadcrumb();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  private updateBreadcrumb(): void {
    const url = this.router.url;
    this.breadcrumbItems = [];
    
    if (url.includes('/dashboard')) {
      this.breadcrumbItems = [{ label: 'Dashboard' }];
    } else if (url.includes('/labs')) {
      this.breadcrumbItems = [{ label: 'Laboratoires' }];
    } else if (url.includes('/users')) {
      this.breadcrumbItems = [{ label: 'Utilisateurs' }];
    } else if (url.includes('/equipments')) {
      this.breadcrumbItems = [{ label: 'Équipements' }];
    } else if (url.includes('/reservations')) {
      this.breadcrumbItems = [{ label: 'Réservations' }];
    } else if (url.includes('/attendances')) {
      this.breadcrumbItems = [{ label: 'Présences' }];
    } else if (url.includes('/accesses/roles')) {
      this.breadcrumbItems = [
        { label: 'Gestion des accès', routerLink: '/protected/accesses' },
        { label: 'Rôles' }
      ];
    } else if (url.includes('/accesses/permissions')) {
      this.breadcrumbItems = [
        { label: 'Gestion des accès', routerLink: '/protected/accesses' },
        { label: 'Permissions' }
      ];
    } else if (url.includes('/accesses/modules')) {
      this.breadcrumbItems = [
        { label: 'Gestion des accès', routerLink: '/protected/accesses' },
        { label: 'Modules' }
      ];
    } else if (url.includes('/accesses')) {
      this.breadcrumbItems = [{ label: 'Gestion des accès' }];
    } else if (url.includes('/administrations')) {
      this.breadcrumbItems = [{ label: 'Administration' }];
    }
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleNotifications(event: Event): void {
    this.notificationsPopover.toggle(event);
  }

  toggleQuickActions(event: Event): void {
    this.quickActionsPopover.toggle(event);
  }

  toggleUserMenu(event: Event): void {
    this.userMenuPopover.toggle(event);
  }

  executeQuickAction(action: QuickAction): void {
    if (action.route) {
      this.router.navigate([action.route]);
    } else if (action.action) {
      action.action();
    }
    this.quickActionsPopover.hide();
  }


}
