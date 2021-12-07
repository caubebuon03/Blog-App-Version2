import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTagListComponent } from './article-tag-list.component';

describe('ArticleTagListComponent', () => {
  let component: ArticleTagListComponent;
  let fixture: ComponentFixture<ArticleTagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTagListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
