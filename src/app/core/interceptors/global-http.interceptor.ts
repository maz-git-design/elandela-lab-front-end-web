import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const GlobalHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const router = inject(Router);

  const modifiedReq = req.clone({
    setHeaders: { timezone },
    withCredentials: true
  });

  return next(modifiedReq).pipe(
    catchError(error => handleError(error, router))
  );
};

function handleError(error: HttpErrorResponse, router: Router) {
  let errorMessage = "An unknown error occurred.";

  switch (error.status) {
    case 0:
      errorMessage = "No Internet Connection.";
      break;
    case 401:
      errorMessage = error.error?.message || 'Unauthorized. Please log in.';
      // Only redirect if not on auth pages
      const authPages = ['/auth/login', '/auth/set-password', '/auth/face-registration', '/auth/reset-password'];
      const isOnAuthPage = authPages.some(page => router.url.includes(page));
      if (!isOnAuthPage) {
        router.navigate(['/auth/login']);
      }
      break;
    case 400:
    case 403:
    case 404:
    case 409:
      errorMessage = error.error?.message || error.message;
      break;
    case 500:
      errorMessage = "Server Error. Please try again later.";
      break;
    default:
      errorMessage = `Error ${error.status}: ${error.message}`;
  }

  return throwError(() => new Error(errorMessage, { cause: error }));
}
