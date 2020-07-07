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

  constructor(private httpClient: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    let allArticlesUrl = './article-api/public/articles'
    return this.httpClient.get<Article[]>(allArticlesUrl)/*.pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => Geoloc.fromJson(jsonItem))
      )
    )*/
  }

  public getIdArticle(articleId: string) : Observable<Article>{
    let url = "./article-api/public/article/pmid/"+ articleId;
    return this.httpClient.get<Article>(url);
  }
  
}


