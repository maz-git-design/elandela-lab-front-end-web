import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const ProtectedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    router.navigate(['/auth/login']);
    return false;
  }

  const user = JSON.parse(currentUser);

  // Check if user needs to complete auth flow first
  if (user.mustSetNewPassword) {
    router.navigate(['/auth/set-password']);
    return false;
  }

  if (!user.faceFingerprint?.isActive) {
    router.navigate(['/auth/face-registration']);
    return false;
  }

  return true;
};