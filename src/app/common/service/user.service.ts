import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
<<<<<<< HEAD
  private userUrl = './api-auth/test/user';
  // private pmUrl = './auth-api/test/pm';
  // private adminUrl = './auth-api/test/admin';
=======
  // private userUrl = 'http://localhost:9997/api-auth/test/user';
  // private pmUrl = 'http://localhost:9997/api-auth/test/pm';
  // private adminUrl = 'http://localhost:9997/api-auth/test/admin';
  private userUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/test/user';
  private pmUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/test/pm';
  private adminUrl = 'https://pubmed-map-spring-jwt.herokuapp.com/api-auth/test/admin';
>>>>>>> dev_V0.5.5
 
  constructor(private http: HttpClient) { }
 
  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }
 
  // getPMBoard(): Observable<string> {
  //   return this.http.get(this.pmUrl, { responseType: 'text' });
  // }
 
  // getAdminBoard(): Observable<string> {
  //   return this.http.get(this.adminUrl, { responseType: 'text' });
  // }
}