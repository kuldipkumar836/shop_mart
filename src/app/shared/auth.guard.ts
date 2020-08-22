import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router,
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // const isAuth = this.authService.getIsAuth();
     // console.log(isAuth)
      if (this.authService.getIsAuth()) {
        //this.router.navigate(['auth/login']);
        return true;
      } else {
        this.router.navigate(['auth/login']);
      }

      //return isAuth;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuth = this.authService.getIsAuth();
      console.log(isAuth)
      if (!isAuth) {
        this.router.navigate(['auth/login']);
      }
      return isAuth;
  }

}