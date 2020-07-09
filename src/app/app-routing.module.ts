import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'app',
    component: AppComponent
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
    redirectTo: 'app',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
