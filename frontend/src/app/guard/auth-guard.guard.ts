import { Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuardGuard implements CanActivate {
  router: any;
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('currentUser') ) {
        return true;
      }

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

      return false;
  }
  
}