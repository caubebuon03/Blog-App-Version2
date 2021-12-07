import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './components/editor/editor.component';
import { ArticlepageComponent } from './pages/articlepage/articlepage.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';



@NgModule({
  declarations: [
    EditorComponent,
    ArticlepageComponent,
    NewArticleComponent,
    EditArticleComponent,
    CommentContainerComponent,
    CommentListComponent,
    CommentItemComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    MarkdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule { }
