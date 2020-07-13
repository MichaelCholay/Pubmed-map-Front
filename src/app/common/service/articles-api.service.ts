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
<<<<<<< HEAD
  localhostPortUrl: "http://localhost:9998"
=======
  hostSpring = 'https://pubmed-map-spring-article.herokuapp.com/'
>>>>>>> dev_V0.5.5

  constructor(private httpClient: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
<<<<<<< HEAD
    let allArticlesUrl = `${this.localhostPortUrl}/article-api/public/articles`
    return this.httpClient.get<Article[]>(allArticlesUrl)/*.pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => Geoloc.fromJson(jsonItem))
      )
    )*/
  }

  public getIdArticle(articleId: string) : Observable<Article>{
    let url = `${this.localhostPortUrl}/article-api/public/article/pmid/${articleId}`;
=======
    let allArticlesUrl = `${this.hostSpring}article-api/public/articles`
    return this.httpClient.get<Article[]>(allArticlesUrl)
  }

  public getIdArticle(articleId: string) : Observable<Article>{
    let url = `${this.hostSpring}/article-api/public/article/pmid/${articleId}`
>>>>>>> dev_V0.5.5
    return this.httpClient.get<Article>(url);
  }
  
}


