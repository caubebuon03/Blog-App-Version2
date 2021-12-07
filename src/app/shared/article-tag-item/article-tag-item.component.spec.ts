import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTagItemComponent } from './article-tag-item.component';

describe('ArticleTagItemComponent', () => {
  let component: ArticleTagItemComponent;
  let fixture: ComponentFixture<ArticleTagItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTagItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTagItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
