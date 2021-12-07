import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tagsLoading!: boolean;
  tags: string[] = [];

  constructor(private auth: AuthService, public router: Router, private feed: FeedService) { }

  ngOnInit() {
    this.getTags();
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getTags() {
    this.tagsLoading = true;
    this.feed.getFamousTags().subscribe(
      (data: {tags?: string[]}) => {
        this.tags = data.tags!;
      },
      (err) => {console.log(err);},
      () => {this.tagsLoading = false;}
    );
  }

}
