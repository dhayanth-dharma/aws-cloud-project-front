import { request_ } from './api-socket/request-mode';
import { response_ } from './api-socket/response-model';

import { MainPageModule } from './main-page/main-page.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInteractionComponent } from './user-interaction/user-interaction.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInteractionService } from './user-interaction/user-interaction.service';
import { FormsModule } from '@angular/forms';
import { FillingSocketAPI } from './api-socket/filling-api.socket';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserInteractionComponent
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    MainPageModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserInteractionService, FillingSocketAPI, response_,request_],
  bootstrap: [AppComponent]
})
export class AppModule { }
