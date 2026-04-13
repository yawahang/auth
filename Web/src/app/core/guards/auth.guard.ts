
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Allow SSR
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Not logged in → go to login
  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  // If user is NOT active → force activate-page
  if (!auth.isActive() && state.url !== '/activate-page') {
    return router.createUrlTree(['/activate-page']);
  }

  // If user already active → block activate-page
  if (auth.isActive() && state.url === '/activate-page') {
    return router.createUrlTree(['/dashboard']);
  }

  // Allow access
  return true;
};
