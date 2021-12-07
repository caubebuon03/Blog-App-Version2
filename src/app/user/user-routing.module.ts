import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { FavPostsComponent } from "./components/fav-posts/fav-posts.component";
import { PostsComponent } from "./components/posts/posts.component";
import { EditProfileComponent } from "./pages/edit-profile/edit-profile.component";
import { ProfileComponent } from "./pages/profile/profile.component";



const routes: Routes = [
    {
        path: 'profile/:username',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'posts',
            pathMatch: 'full'
          },
          {
            path: 'posts',
            component: PostsComponent
          },
          {
            path: 'favourites',
            component: FavPostsComponent
          }
        ]
      },
      {
        path: 'user/settings',
        component: EditProfileComponent,
        canActivate: [AuthGuard]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }