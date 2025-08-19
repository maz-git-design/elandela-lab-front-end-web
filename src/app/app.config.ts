import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import ThemePreset from '../themes/theme.preset';
import { routes } from './app.routes';
import {
  provideTranslateService,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobalHttpInterceptor } from './core/interceptors/global-http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/app/' }),
      fallbackLang: 'fr',
      lang: 'en',
    }),
    provideHttpClient(withInterceptors([GlobalHttpInterceptor])),
    providePrimeNG({
      theme: {
        preset: ThemePreset,
        options: {
          darkModeSelector: 'none',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
};
