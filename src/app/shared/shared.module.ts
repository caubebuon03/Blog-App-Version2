import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleItemComponent } from './article-item/article-item.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleTagListComponent } from './article-tag-list/article-tag-list.component';
import { ArticleTagItemComponent } from './article-tag-item/article-tag-item.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ArticleItemComponent,
    ArticleListComponent,
    ArticleTagListComponent,
    ArticleTagItemComponent,
    PaginationComponent
  ],
  declarations: [
    ArticleItemComponent,
    ArticleListComponent,
    ArticleTagListComponent,
    ArticleTagItemComponent,
    PaginationComponent

  ]
})
export class SharedModule { }
