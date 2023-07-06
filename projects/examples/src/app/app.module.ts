import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxPipesLiteModule} from "ngx-pipes-lite";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPipesLiteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
