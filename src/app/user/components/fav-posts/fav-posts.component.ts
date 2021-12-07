import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-fav-posts',
  templateUrl: './fav-posts.component.html',
  styleUrls: ['./fav-posts.component.css']
})
export class FavPostsComponent implements OnInit {

  author!: string;
  authorFavPosts: Article[] = [];
  isLoading!: boolean;
  noOfArticles!: number;

  constructor(private feed: FeedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.parent?.paramMap.subscribe(
      (params) => {
        this.author = params.get('username')!;
        this.getAuthorFavPosts(0);
      }
    );
  }

  getAuthorFavPosts(offset: any) {
    this.isLoading = true;
    this.feed.getAuthorFavArticles(this.author, offset).subscribe(
      (data: {articles?: Article[], articlesCount?: number}) => {
        this.authorFavPosts = data.articles!;
        this.noOfArticles = data.articlesCount!;
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  selected(pageNumber: number) {
    this.getAuthorFavPosts(pageNumber);
  }

}
