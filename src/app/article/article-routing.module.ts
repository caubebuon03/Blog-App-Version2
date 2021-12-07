import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticlepageComponent } from './pages/articlepage/articlepage.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { AuthGuard } from '../guards/auth.guard';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';


const routes: Routes = [
  {path: 'article/:slug', component: ArticlepageComponent},
  {path: 'editor', component: NewArticleComponent, canActivate: [AuthGuard]},
  {path: 'editor/:slug', component: EditArticleComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
