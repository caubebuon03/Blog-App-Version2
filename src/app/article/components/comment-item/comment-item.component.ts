import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment!: Comment;

  constructor(private auth: AuthService, private commentService: CommentsService  ) { }

  ngOnInit(): void {
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get currentUser() {
    return this.auth.getUserName();
  }

  deleteComment() {
    this.commentService.deleteEvent.emit(this.comment.id);
  }

}
