import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private authenService: AuthService) { }

  setAuthoriztionHeaders() {
    const token = this.authenService.getUserToken();
    const headers = new HttpHeaders({'Authorization': `${token}`});
    return headers;
  }

  getArticleBySlug(slug: any) {
    if(this.authenService.isLoggedIn()) {
      const headers = this.setAuthoriztionHeaders();
      return this.http.get(`${ this.apiUrl }/articles/${ slug }`, {headers: headers});
    }
    return this.http.get(`${ this.apiUrl }/articles/${ slug }`);
  }

  postNewArticle(article: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.post(`${ this.apiUrl }/articles`, article, {headers: headers});
  }

  editArticle(article: any, articleSlug: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.put(`${ this.apiUrl }/articles/${ articleSlug }`, article, {headers: headers});
  }

  deleteArticle(articleSlug: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.delete(`${ this.apiUrl }/articles/${ articleSlug }`, {headers: headers});
  }

  favoriteArticle(articleSlug: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.post(`${ this.apiUrl }/articles/${articleSlug}/favorite`, {} , {headers: headers});
  }

  unfavoriteArticle(articleSlug: any) {
    const headers = this.setAuthoriztionHeaders();
    return this.http.delete(`${ this.apiUrl }/articles/${articleSlug}/favorite`, {headers: headers});
  }
}
