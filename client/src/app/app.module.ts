import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestApiService } from './services/rest-api.service';
import { DataService } from './services/data.service';
import { MessageComponent } from './message/message.component';
import { RegistrationComponent } from './registration/registration.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      maxOpened: 5,
      newestOnTop: false
    })
  ],
  providers: [RestApiService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
