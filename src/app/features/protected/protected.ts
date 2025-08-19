import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-protected',
  imports: [CommonModule, Sidebar, Topbar, RouterOutlet],
  templateUrl: './protected.html',
  styleUrl: './protected.scss',
})
export class Protected {
  sidebarCollapsed: boolean = false;

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
