import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article!: Article;

  constructor(private router: Router, private auth: AuthService, private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  readArticle(slug: any) {
    this.router.navigate(['/article', slug]);
  }

  favorite() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.articleService.favoriteArticle(this.article.slug).subscribe(
      (data: {article?: Article}) => {this.article = data.article!;},
      (err) => { console.log(err); },
      () => { console.log('completed'); }
    );
  }

  unfavorite() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.articleService.unfavoriteArticle(this.article.slug).subscribe(
      (data: {article?: Article}) => {this.article = data.article!;},
      (err) => { console.log(err); },
      () => { console.log('completed'); }
    )
  }

}
