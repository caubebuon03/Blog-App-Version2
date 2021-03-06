import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css']
})
export class CommentContainerComponent implements OnInit {

  @Input() slug!: string;
  comments: Comment[] = [];
  isLoading!: boolean;


  constructor(private commentService: CommentsService, private auth: AuthService) {
    this.commentService.deleteEvent.subscribe(
      (commentId) => {
        console.log(commentId);
        this.deleteComment(commentId);
      }
    )
   }

  ngOnInit(): void {
    this.getArticleComments();
  }

  getArticleComments() {
    this.commentService.getArticleComments(this.slug).subscribe(
      (data: {comments?: Comment[]}) => {
        this.comments = data.comments!;
        console.log(this.comments);
      },
      (err) => {console.log(err);},
      () => {}
    );
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  findComment(commentId: number) {
    return this.comments.map(comment => comment.id).indexOf(commentId);
  }

  addComment(commentValue: any) {
    commentValue = commentValue.trim();
    if(commentValue.length !== 0) {
      const comment = {
        body: commentValue
      };
      this.commentService.postArticleComment(this.slug, {comment: comment}).subscribe(
        (data: {comment?: Comment}) => {this.comments.unshift(data.comment!);},
        (err) => {console.log(err);},
        () => {}
      );
    }
  }

  deleteComment(commentId: number) {
    this.commentService.deleteArticleComment(this.slug, commentId).subscribe(
      (data) => {
        this.comments.splice(this.findComment(commentId), 1);
      },
      (err) => {console.log(err);},
      () => {}
    );
  }

}
