import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  
  const service = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  if (service.IsLoggedIn()) {
    
          return true;
        } else {
          router.navigate(['login']);
          
          return false;
        }
};
