import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  author!: string;
  authorPosts: Article[] = [];
  isLoading!: boolean;
  noOfArticles!: number;

  constructor(private feed: FeedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.paramMap.subscribe(
      (params) => {
        this.author = params.get('username')!;
        this.getAuthorPosts(0);
      }
    );
  }

  getAuthorPosts(offset: any) {
    this.isLoading = true;
    this.feed.getAuthorArticles(this.author, offset).subscribe(
      (data: {articles?: Article[], articlesCount?: number}) => {
        this.authorPosts = data.articles!;
        this.noOfArticles = data.articlesCount!;
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  selected(pageNumber: number) {
    this.getAuthorPosts(pageNumber);
  }

}
