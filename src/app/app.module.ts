import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './common/auth/login/login.component';
import { RegisterComponent } from './common/auth/register/register.component';
import { UserComponent } from './common/auth/user/user.component';

// import { httpInterceptorProviders } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  // providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
