import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: [ 'Test 2', [Validators.required] ],
    email: ['test1@gmail.com', [Validators.required, Validators.email] ],
    password: [ '123456', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void { }


  register() {
    
    const { name, email, password } = this.myForm.value;
    this.authService.postRegister(name, email, password)
          .subscribe( resp => {
            if (resp === true) {
              this.router.navigateByUrl('/dashboard');
            } else {
              Swal.fire('Error', resp, 'error');
            };
          })
    
    // this.myForm.reset();
  };

}
