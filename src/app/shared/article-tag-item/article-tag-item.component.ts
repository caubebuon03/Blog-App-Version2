import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-tag-item',
  templateUrl: './article-tag-item.component.html',
  styleUrls: ['./article-tag-item.component.css']
})
export class ArticleTagItemComponent implements OnInit {

  @Input() tag!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
