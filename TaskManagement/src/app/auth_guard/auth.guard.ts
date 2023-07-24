import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../service/service/user-auth.service';
import { UserService } from '../service/service/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject (Router);
  const auth = inject(UserAuthService);
  const userService = inject(UserService);

  if(auth.getToken()!==null){
    const role = route.data["role"] as Array<string>;
    if(role){
      const isRoleMatch = userService.matchRoles(role);

      if(isRoleMatch){
        return true;
      }
      else{
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }
  router.navigate(['/login']);
  return false;
};
