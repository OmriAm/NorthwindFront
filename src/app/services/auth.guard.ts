import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotifyService } from './notify.service';

export const authGuard: CanActivateFn = (route, state) => {


    const token = localStorage.getItem("token");

    if (token) return true;
    const notifyService = inject(NotifyService);
    const router = inject(Router);

    notifyService.error("You are not logged in");
    router.navigateByUrl("/login");
  return false;
};
