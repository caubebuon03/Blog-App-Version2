import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import prettifyError from 'src/app/Error/errorHandler';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  signUpForm!: FormGroup;
  errors: string[] = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
   }

  ngOnInit(): void {
  }

  get form() { return this.signUpForm.controls; }

  handleForm(userCre: any) {
    this.auth.signUpUser({user: userCre}).subscribe(
      (data: {user?: User}) => {
        this.auth.setUser(data.user);
        this.router.navigate(['/home/yourfeed']);
      },
      (err) => {
        const errorMsg = err.error.errors;
        const statusCode = err.status;
        if (statusCode === 422) {
          this.errors = prettifyError(errorMsg);
        } else if (statusCode === 404) {
          console.log(`404 : Not Found`);
        } else if (statusCode === 401) {
          console.log(`401 : Unauthorized Access`);
        } else if (statusCode === 403) {
          console.log(`403 : Forbidden Access`);
        }
      },
      () => { console.log('COMPLETD SIGNUP'); }
    );
  }
}
