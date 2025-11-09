import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AppStore } from './store/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  providers: [MessageService],
  templateUrl: './app.html',
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
          life: 5000,
        });
        this.appStore.clearError();
      }
    });
  }
}
