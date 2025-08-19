import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../../configs/environment';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(
      `${environment.mainServiceUrl}/translations?lang=${lang}`
    );
  }
}

export const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader();

export function customTranslateLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}
