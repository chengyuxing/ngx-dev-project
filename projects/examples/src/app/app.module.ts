import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxPipesLiteModule} from "ngx-pipes-lite";
import {ArrPipe} from "./pipes/arr.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ArrPipe
  ],
  imports: [
    BrowserModule,
    NgxPipesLiteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
