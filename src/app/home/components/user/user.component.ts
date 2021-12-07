import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userArticles: Article[] = [];
  isLoading!: boolean;
  noOfArticles!: number;

  constructor(private feed: FeedService) { }

  ngOnInit(): void {
    this.getUserArticles(0);
  }

  getUserArticles(offset: any) {
    this.isLoading = true;
    this.feed.getUserFeed(offset).subscribe(
      (data: {articles?: Article[], articlesCount?: number}) => {
        this.userArticles = data.articles!;
        this.noOfArticles = data.articlesCount!;
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  selected(pageNumber: number) {
    this.getUserArticles(pageNumber);
  }

}
