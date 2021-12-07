import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  isLoading!: boolean;
  tag!: string;
  tagArticles!: Article[];
  noOfArticles!: number;

  constructor(private route: ActivatedRoute, private feed: FeedService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.tag = params?.['tag'];
        this.getTagArticles(0);
      }
    );
  }

  getTagArticles(offset: any) {
    this.isLoading = true;
    this.feed.getTagFeed(this.tag, offset).subscribe(
      (data: {articles?: Article[], articlesCount?: number}) => {
        this.tagArticles = data.articles!;
        this.noOfArticles = data.articlesCount!;
      },
      (err) => {console.log(err);},
      () => {this.isLoading = false;}
    );
  }

  selected(pageNumber: number) {
    this.getTagArticles(pageNumber);
  }

}
