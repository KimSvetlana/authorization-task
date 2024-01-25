import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router)
  // return authService.$isLoggedIn;
  if (authService.$isLoggedIn) {
    return true;
  } else {
    // User is not authenticated, redirect to the login page
    router.navigate(['/login']);
    return false;
  }
};
