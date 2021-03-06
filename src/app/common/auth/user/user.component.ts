import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { TokenStorageService } from '../../service/auth/token-storage.service';
import { FavorisService } from '../../service/favoris.service';
import { FavoriteArticle } from '../../model/favoriteArticle';
import { ArticlesApiService } from '../../service/articles-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  headers: string[] = ["_id", "articleTitle", "journal", "revisionDate", "pubmedUrl"];
  column;
  info;
  favoritesList: FavoriteArticle[]
  isEmpty: boolean = true

  constructor(private userService: UserService, private token: TokenStorageService, private favorisService: FavorisService, private articleService: ArticlesApiService) { }

  ngOnInit() {

    //get list of favorites
    this.getListIdFavorites()

    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
    }

  }

  getListIdFavorites() {
    let username = this.token.getUsername()
    this.favorisService.getAllFavorite(username).subscribe(
      data => {
        this.favoritesList = data
        this.getArticleById(this.favoritesList)
        if (this.favoritesList.length != 0) {
          this.isEmpty = false
        }
      }
    )
  }

  getArticleById(favoritesList) {
    for (let i = 0; i < favoritesList.length; i++) {
      this.articleService.getArticleByPmid(favoritesList[i].articleId)
        .subscribe(article => {
          favoritesList.push(article)
        })
    }
  }


}