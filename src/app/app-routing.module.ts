import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidateTokenGuard } from './guards/validate-token.guard';
import { ValidateLoginGuard } from './guards/validate-login.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canActivate: [ValidateLoginGuard] // este guard lo cree para evitar que se muestre el login y registro si se esta logueado
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canLoad: [ValidateTokenGuard],
    canActivate: [ValidateTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
