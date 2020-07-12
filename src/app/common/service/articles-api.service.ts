import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../model/article';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Geoloc } from '../model/geoloc';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ArticlesApiService {
  articles: Article[];
  hostSpring = 'https://pubmed-map-spring-article.herokuapp.com/'

  constructor(private httpClient: HttpClient) { }

  // getAllArticles(): Observable<Article[]> {
  //   let allArticlesUrl = `${this.hostSpring}article-api/public/articles`
  //   return this.httpClient.get<Article[]>(allArticlesUrl)
  // }

  // public getIdArticle(articleId: string) : Observable<Article>{
  //   let url = `${this.hostSpring}/article-api/public/article/pmid/${articleId}`
  //   return this.httpClient.get<Article>(url);
  // }
  
}


