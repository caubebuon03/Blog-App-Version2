import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit, OnChanges {

  @Input() username!: any;
  author!: Profile;
  isLoading!: boolean;

  constructor(private profileService: ProfileService, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAuthor();
  }

  ngOnChanges() {
    this.getAuthor();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get currentUser() {
    return this.auth.getUserName();
  }

  getAuthor() {
    this.isLoading = true;
    this.profileService.getAuthorProfile(this.username).subscribe(
      (data: {profile?: Profile}) => {
        this.author = data.profile!;
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  follow() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.followUser(this.author.username).subscribe(
      (data: {profile?: Profile}) => {
        this.author = data.profile!;
      },
      (err) => {console.log(err);},
      () => {}
    );
  }

  unfollow() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.unfollowUser(this.author.username).subscribe(
      (data: {profile?: Profile}) => {
        this.author = data.profile!;
      },
      (err) => {console.log(err);},
      () => {}
    );
  }

  editProfile() {
    this.router.navigate(['/user/settings']);
  }

}
