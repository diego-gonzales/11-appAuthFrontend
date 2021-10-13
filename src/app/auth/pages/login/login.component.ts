import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email: ['test1@gmail.com', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });


  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void { }

  login() {

    const { email, password } = this.myForm.value;

    this.authService.postLogin( email, password )
        .subscribe( resp => {
          // resp === true sino igual pasa la validacion, tenemos que especificar que sea true
          if (resp === true) {
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire('Error', resp, 'error')
          }
        })

    // this.myForm.reset();

  };

}
