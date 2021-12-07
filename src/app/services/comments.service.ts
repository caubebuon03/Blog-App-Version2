import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  apiUrl = 'https://conduit.productionready.io/api';
  deleteEvent = new EventEmitter<number>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  setAuthoriztionHeaders() {
    const token = this.authService.getUserToken();
    const headers = new HttpHeaders({'Authorization': `${token}`});
    return headers;
  }

  getArticleComments(slug: any) {
    return this.http.get(`${ this.apiUrl }/articles/${ slug }/comments`);
  }

  postArticleComment(slug: any, comment: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.post(`${ this.apiUrl }/articles/${ slug }/comments`, comment, {headers: headers});
  }

  deleteArticleComment(slug: any, commentId: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.delete(`${ this.apiUrl }/articles/${ slug }/comments/${ commentId }`, {headers: headers});
  }
}
