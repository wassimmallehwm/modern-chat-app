import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      this.authService.checkAuth();
      const isAuth = this.authService.getIsAuth();
      const token = this.authService.getToken();
      const storedToken = localStorage.getItem('token');
      if (!isAuth) {
        this.router.navigate(['/login']);
        return false;
      } else if (token !== storedToken) {
        this.authService.setIsNotAuth();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
}
