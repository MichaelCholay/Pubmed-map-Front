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
  localhostPortUrl: 'http://localhost:9998'
  hostSpring = 'https://pubmed-map-spring-article.herokuapp.com'

  constructor(private httpClient: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    let allArticlesUrl = `http://localhost:9998/article-api/public/articles`
    console.log(allArticlesUrl)
    return this.httpClient.get<Article[]>(allArticlesUrl)
  }

  public getArticleByPmid(articleId) : Observable<Article>{
    let url = `http://localhost:9998/article-api/public/article/pmid/${articleId}`
    return this.httpClient.get<Article>(url);
  }
  
}


