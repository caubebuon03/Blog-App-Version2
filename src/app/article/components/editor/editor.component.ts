import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import prettifyError from 'src/app/Error/errorHandler';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @Input() article?: any;
  errors: string[] = [];
  editFlag = false;
  title!: string;
  description!: string;
  content!: string;
  tags!: string;
  articleEditorForm!: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) { }

  ngOnInit(): void {
    if(this.article !== undefined) {
      this.editFlag = true;
      this.title = this.article.title;
      this.description = this.article.description;
      this.content = this.article.body;
      this.tags = this.article.tagList.join(',');
    }
    this.articleEditorForm = this.fb.group({
      'title': [this.title, Validators.required],
      'description': [this.description, Validators.required],
      'content': [this.content, Validators.required],
      'tags': [this.tags]
    });
  }

  get form() { return this.articleEditorForm.controls; }

  handleForm(form: any) {
    const formValue = {
      title: form.title,
      description: form.description,
      body: form.content,
      tagList: form.tags.split(',')
    };
    if(this.editFlag) {
      this.editArticle(formValue, this.article.slug);
    } else {
      this.postArticle(formValue);
    }
  }

  postArticle(article: any) {
    this.articleService.postNewArticle({article: article}).subscribe(
      (data: any) => {
        this.router.navigate(['/article', data.article.slug]);
      },
      (err) => {
        const errorMsg = err.error.errors;
        const statusCode = err.status;
        if(statusCode === 422) {
          this.errors = prettifyError(errorMsg);
        } else if(statusCode === 404) {
          console.log(`404 : Not Found`);
        } else if(statusCode === 401) {
          console.log(`401 : Unauthorized Access`);
        } else if(statusCode === 403) {
          console.log(`403 : Forbidden Access`);
        }
      },
      () => {}
    );
  }

  editArticle(article: any, articleSlug: any) {
    this.articleService.editArticle(article, articleSlug).subscribe(
      (data: any) => {
        this.router.navigate(['/article', data.article.slug]);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('EDIT COMPLETED');
      }
    )
  }

}
