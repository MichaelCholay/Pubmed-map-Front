import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
