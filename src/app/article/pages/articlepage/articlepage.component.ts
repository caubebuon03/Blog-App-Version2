import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { Profile } from 'src/app/models/Profile';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articlepage',
  templateUrl: './articlepage.component.html',
  styleUrls: ['./articlepage.component.css']
})
export class ArticlepageComponent implements OnInit {

  articleSlug!: string;
  article!: Article;
  isLoading!: boolean;


  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, 
    private auth: AuthService, private userService: UserService, private router: Router) { 
      this.articleSlug = this.activatedRoute.snapshot.params?.['slug'];
    }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    this.isLoading = true;
    this.articleService.getArticleBySlug(this.articleSlug).subscribe(
      (data: any) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get currentUser(): string {
    return this.auth.getUserName();
  }

  editArticle(slug: any) {
    this.router.navigate(['editor', slug]);
  }

  deleteArticle(slug: any) {
    this.articleService.deleteArticle(slug).subscribe(
      (data) => {
        this.router.navigate(['/profile', this.currentUser]);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('DELETE COMPLETED');
      }
    );
  }

  favourite() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.articleService.favoriteArticle(this.article.slug).subscribe(
      (data: {article?: Article}) => { this.article = data.article!; },
      (err) => { console.log(err); },
      () => { console.log('completed'); }
    );
  }

  unfavorite() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.articleService.unfavoriteArticle(this.article.slug).subscribe(
      (data: {article?: Article}) => { this.article = data.article!; },
      (err) => { console.log(err); },
      () => { console.log('completed'); }
    );
  }

  follow() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.followUser(this.article.author.username).subscribe(
      (data: {profile?: Profile}) => {
        this.article.author = data.profile!;
      },
      (err) => {
        console.log(err);
      },
      () => {}
      );
  }

  unfollow() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userService.unfollowUser(this.article.author.username).subscribe(
      (data: {profile?: Profile}) => {
        this.article.author = data.profile!;
      },
      (err) => {
        console.log(err);
      },
      () => {
      }
    );
  }
}
