import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [InputText, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'elandela lab';

  readonly counter$ = interval(1000);
}
