import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './common/auth/login/login.component';
import { RegisterComponent } from './common/auth/register/register.component';
import { UserComponent } from './common/auth/user/user.component';


const routes: Routes = [
  {path: 'articles', component: MapComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: '', redirectTo:'/articles', pathMatch:'full'},
  {path: 'signup', component: RegisterComponent},
  {path:'userAccount', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
