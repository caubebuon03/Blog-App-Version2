import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { GlobalComponent } from './components/global/global.component';
import { UserComponent } from './components/user/user.component';
import { TagComponent } from './components/tag/tag.component';



@NgModule({
  declarations: [
    HomeComponent,
    GlobalComponent,
    UserComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
