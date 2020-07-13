import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { markerClusterGroup } from 'leaflet';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  {
    path: '',
    component: MapComponent
},
{
    path: 'user',
    component: UserComponent
},
// {
//     path: 'pm',
//     component: PmComponent
// },
// {
//     path: 'admin',
//     component: AdminComponent
// },
{
    path: 'auth/login',
    component: LoginComponent
},
{
    path: 'signup',
    component: RegisterComponent
},
{
    path: '',
    redirectTo: '',
    pathMatch: 'full'
}
=======
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
>>>>>>> dev_V0.5.5
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
