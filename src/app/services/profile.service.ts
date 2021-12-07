import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private auth: AuthService ) { }

  setAuthoriztionHeaders() {
    const token = this.auth.getUserToken();
    const headers = new HttpHeaders({'Authorization': `${token}`});
    return headers;
  }

  getAuthorProfile(username: any) {
    if(this.auth.isLoggedIn()) {
      const headers = this.setAuthoriztionHeaders();
      return this.http.get(`${ this.apiUrl }/profiles/${username}`, {headers: headers});
    }
    return this.http.get(`${ this.apiUrl }/profiles/${username}`);
  }
}
