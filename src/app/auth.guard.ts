import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if(!inject(AuthService).logged) {

    inject(Router).navigate(['register']);
    return false;
  }

  return true;
};
