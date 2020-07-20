import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteArticle } from "../model/favoriteArticle";

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private hostUrl = 'https://pubmed-map-spring-jwt.herokuapp.com';


  constructor(private http: HttpClient) { }

//add to favorite
addFavorite(username , articleId): Observable<any> {
  return this.http.post(this.hostUrl+ "/api-auth/user/favoriteArticle/add/"+ username +"/"+  articleId,  {responseType:'text' as 'json'});
}
//retrieve list of favorites
getAllFavorite(username): Observable<FavoriteArticle[]> {
  return this.http.get<FavoriteArticle[]>(this.hostUrl + "/api-auth/user/favoriteArticle/findall/"+ username)
}

}
