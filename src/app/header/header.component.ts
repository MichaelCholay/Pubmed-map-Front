import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '../common/service/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  titre: string = "Pubmed World"
  info: any
  private roles: string[];
<<<<<<< HEAD
   authority: string;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    // this.info = {
    //   token: this.token.getToken(),
    //   username: this.token.getUsername(),
    //   authorities: this.token.getAuthorities()
    // };

    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
=======
  public authority: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities()
    };


    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
>>>>>>> dev_V0.5.5
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
<<<<<<< HEAD
        // } else if (role === 'ROLE_PM') {
        //   this.authority = 'pm';
        //   return false;
        // }
         } else this.authority = 'user';
        return true;
      });
    }
=======
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
>>>>>>> dev_V0.5.5
  }

  // logout() {
  //   this.token.signOut();
  //   window.location.reload();
  // }

}
