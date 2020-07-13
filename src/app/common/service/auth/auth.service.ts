import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLoginInfo } from '../../model/auth/login-info';
import { JwtResponse } from '../../model/auth/jwt-response';
import { SignUpInfo } from '../../model/auth/signup-info';


 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  // private loginUrl = 'http://localhost:9997/api-auth/signin';
  // private signupUrl = 'http://localhost:9997/api-auth/signup';
  private loginUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/signin';
  private signupUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/signup';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}