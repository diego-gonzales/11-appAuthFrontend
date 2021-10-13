import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateToken()
              .pipe(
                tap( resp => {
                  if ( !resp ) {
                    this.router.navigateByUrl('/auth/login');
                  };
                })
              )
  };

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateToken()
                .pipe(
                  tap( resp => {
                    if ( !resp ) {
                      this.router.navigateByUrl('/auth/login');
                    };
                  })
                )
  };

}
