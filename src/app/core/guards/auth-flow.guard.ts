import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthFlowGuard: CanActivateFn = () => {
  const router = inject(Router);
  const currentUrl = router.url;
  
  // Define auth pages that should block access to protected routes
  const authPages = ['/auth/login', '/auth/set-password', '/auth/face-registration', '/auth/reset-password'];
  const isOnAuthPage = authPages.some(page => currentUrl.includes(page));
  
  // If user is on auth page and tries to access protected route, block it
  if (isOnAuthPage && currentUrl.includes('/protected/')) {
    return false;
  }
  
  return true;
};