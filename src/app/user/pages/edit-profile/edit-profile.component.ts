import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import prettifyError from 'src/app/Error/errorHandler';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user!: User;
  userForm!: FormGroup;
  errors: string[] = [];
  isLoading!: boolean

  constructor(private userService: UserService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.isLoading = true;
    this.userService.getUser().subscribe(
      (data: {user?: User}) => {
        this.user = data.user!;
        this.createForm();
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  get form() { return this.userForm.controls; }

  createForm() {
    this.userForm = this.fb.group({
      'username': [this.user.username, Validators.required],
      'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
      'bio': [this.user.bio],
      'image': [this.user.image, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  handleForm(userFormValue: any) {
    this.userService.editUser({user: userFormValue}).subscribe(
      (data: {user?: User}) => {
        this.auth.setUser(data.user);
        this.router.navigate(['/profile', data.user!.username]);
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
      () => {
      }
    )
  }
}
