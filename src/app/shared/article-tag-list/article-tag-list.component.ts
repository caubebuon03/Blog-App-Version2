import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-article-tag-list',
  templateUrl: './article-tag-list.component.html',
  styleUrls: ['./article-tag-list.component.css']
})
export class ArticleTagListComponent implements OnInit {

  @Input() articleTags!: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
