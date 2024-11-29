import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AjaxGetJsonPipe, GroupPipe, MathPipe, PagingPipe, TruncPipe, ZipPipe} from "ngx-pipes-lite";
import {HttpClientModule} from "@angular/common/http";
import {PipesComponent} from './components/pipes/pipes.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AppRoutingModule} from "./app-routing.module";
import {TabsWithContentComponent} from './components/tabs-with-content/tabs-with-content.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CyxMenubarComponent} from "ngx-menubar";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    PipesComponent,
    SidebarComponent,
    TabsWithContentComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AjaxGetJsonPipe,
        PagingPipe,
        TruncPipe,
        MathPipe,
        ZipPipe,
        GroupPipe,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule,
        CyxMenubarComponent,
        MatSidenavModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
