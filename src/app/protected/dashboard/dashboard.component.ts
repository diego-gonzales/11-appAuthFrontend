import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {

  get user(): User {
    return this.authService.user
  };

  constructor( private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  };

}
