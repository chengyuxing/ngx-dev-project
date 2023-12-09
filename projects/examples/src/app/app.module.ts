import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AjaxGetJsonPipe, GroupPipe, MathPipe, PagingPipe, TruncPipe, ZipPipe} from "ngx-pipes-lite";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AjaxGetJsonPipe,
    PagingPipe,
    TruncPipe,
    MathPipe,
    ZipPipe,
    GroupPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
