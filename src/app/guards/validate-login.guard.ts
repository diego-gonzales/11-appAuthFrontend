import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginGuard implements CanActivate {

  // Este guard lo cree para proteger la ruta de login y registro en caso de que un usario ya se encuentre logueado

  constructor( private authService: AuthService,
               private router: Router ) { }

  canActivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/dashboard');
      return false
    };
    return true;
  };

  // canLoad(): Observable<boolean> | boolean {
  //     return this.authService.validateToken()
  //                 .pipe(
  //                   tap( resp => {
  //                     if (resp) {
  //                       this.router.navigateByUrl('/dashboard');
  //                     }
  //                   })
  //                 )
  // };

}
