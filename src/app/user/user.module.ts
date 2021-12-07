import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { PostsComponent } from './components/posts/posts.component';
import { FavPostsComponent } from './components/fav-posts/fav-posts.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCardComponent,
    PostsComponent,
    FavPostsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
