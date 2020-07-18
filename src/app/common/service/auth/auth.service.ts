import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { JwtResponse } from '../../model/auth/jwt-response';
import { ArticleResponse } from '../../model/auth/article-response';
import { AuthLoginInfo } from '../../model/auth/login-info';
import { SignUpInfo } from '../../model/auth/signup-info';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private loginUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/signin';
  private signupUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/signup';
  private addFavoriteUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/myFavoriteArticles';
  private addFavoriteUrlLocal = 'https://localhost:9997/api-auth/myFavoriteArticles';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  addArticle(info: ArticleResponse) {
    return this.http.put(this.addFavoriteUrl, info, {responseType: 'text' as 'json'})
  }

  myFavoriteArticles(user: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.addFavoriteUrl, user, httpOptions)
  }

}