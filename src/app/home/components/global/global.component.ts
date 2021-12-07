import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  globalArticles: Article[] = [];
  isLoading!: boolean;
  noOfArticles!: number;

  constructor(private feed: FeedService) { }

  ngOnInit(): void {
    this.getGlobalArticles(0);
  }

  getGlobalArticles(offset: any) {
    this.isLoading = true;
    this.feed.getGlobalFeed(offset).subscribe(
      (data: {articles?: Article[], articlesCount?: number}) => {
        this.globalArticles = data.articles!;
        this.noOfArticles = data.articlesCount!;
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  selected(pageNumber: number) {
    this.getGlobalArticles(pageNumber);
  }

}
