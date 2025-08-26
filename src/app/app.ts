import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppStore } from './store/app.store';

@Component({
  selector: 'app-root',
  imports: [InputText, Button, RouterOutlet, Toast],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'elandela lab';
  
  private readonly appStore = inject(AppStore);
  private readonly messageService = inject(MessageService);

  constructor() {
    effect(() => {
      const error = this.appStore.error();
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 5000
        });
        this.appStore.clearError();
      }
    });
  }
}