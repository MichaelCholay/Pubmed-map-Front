import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../model/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesApiService {
  articles;

  constructor(private httpClient: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    let allArticlesUrl = './article-api/public/articles'
    return this.httpClient.get<Article[]>(allArticlesUrl)
    //  .subscribe(articlesListResponse => this.articles = articlesListResponse);
  }
}


