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
    let allArticlesUrl = `${this.hostSpring}/article-api/public/articles`
    console.log(allArticlesUrl)
    return this.httpClient.get<Article[]>(allArticlesUrl)
  }

  public getArticleByPmid(articleId) : Observable<Article>{
    let url = `${this.hostSpring}/article-api/public/article/pmid/${articleId}`
    return this.httpClient.get<Article>(url);
  }

  public getArticleByTitle(wordTitle) : Observable<Article[]>{
    let url = `${this.hostSpring}/article-api/public/articles/title/${wordTitle}`
    return this.httpClient.get<Article[]>(url);
  }

  public getArticleByDate(date) : Observable<Article[]>{
    let url = `http://localhost:9998/article-api/public/articles?dateMini=${date}`
    return this.httpClient.get<Article[]>(url);
  }

  public getArticleByJournal(journal) : Observable<Article[]>{
    let url = `http://localhost:9998/article-api/public/articles/journal/${journal}`
    return this.httpClient.get<Article[]>(url);
  }
  
  public getArticleByAbstract(wordAbstract) : Observable<Article[]>{
    let url = `http://localhost:9998/article-api/public/articles/abstract/${wordAbstract}`
    return this.httpClient.get<Article[]>(url);
  }

  public getArticleByKeyword(keyword) : Observable<Article[]>{
    let url = `http://localhost:9998/article-api/public/articles/keywords/${keyword}`
    return this.httpClient.get<Article[]>(url);
  }

  public getArticleByAuthor(author) : Observable<Article[]>{
    let url = `http://localhost:9998/article-api/public/articles/author/${author}`
    return this.httpClient.get<Article[]>(url);
  }
}


