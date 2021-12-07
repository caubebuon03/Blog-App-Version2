import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() totalItems!: number;
  pages!: number;
  pageNumbers: number[] = [];
  @Output() pageSeleted: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if(this.totalItems <= 1) {
      this.pages = 0;
    } else {
      this.pages = Math.ceil(this.totalItems / 1);
      for(let i=0; i < this.pages; i++) {
        this.pageNumbers.push(i);
      }
    }
  }

  selected(pageNumber: number) {
    this.pageSeleted.emit(pageNumber * 1);
  }

}
