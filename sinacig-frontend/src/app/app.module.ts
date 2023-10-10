import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';
import { InterceptorService } from './services/interceptor.service';
import { LoginComponent } from './modules/auth-layout/pages/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularMyDatePickerModule,
    // NotifierModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
