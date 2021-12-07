import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GlobalComponent } from './components/global/global.component';
import { UserComponent } from './components/user/user.component';
import { TagComponent } from './components/tag/tag.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'globalfeed',
        pathMatch: 'full'
      },
      {
        path: 'globalfeed',
        component: GlobalComponent
      },
      {
        path: 'yourfeed',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tagfeed',
        component: TagComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
