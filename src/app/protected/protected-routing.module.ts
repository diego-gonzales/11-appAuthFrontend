import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  // Lo de arriba es como si hicieramos esto mismo
  // {
  //   path: '',
  //   component: DashboardComponent
  // },
  // {
  //   path: '**',
  //   redirecTo: ''    
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
