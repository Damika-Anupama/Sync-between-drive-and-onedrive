import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './view/main/main.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GoogleInterceptor} from './interceptor/googleInterceptor';
import {OneDriveComponent} from './view/one-drive/one-drive.component';
import {GoogleDriveComponent} from './view/google-drive/google-drive.component';
import {GoogleDriveService} from './service/google-drive.service';
import {OneDriveService} from './service/one-drive.service';
import {MicrosoftInterceptor} from './interceptor/microsoftInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OneDriveComponent,
    GoogleDriveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // GoogleDriveService,
    // {provide: HTTP_INTERCEPTORS, useClass: GoogleInterceptor, multi: true},
    OneDriveService,
    {provide: HTTP_INTERCEPTORS, useClass: MicrosoftInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
