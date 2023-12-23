import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PipesComponent} from "./components/pipes/pipes.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TabsWithContentComponent} from "./components/tabs-with-content/tabs-with-content.component";

const routes: Routes = [
  {component: PipesComponent, path: 'pipes', pathMatch: 'full'},
  {component: SidebarComponent, path: 'sidebar', pathMatch: 'full'},
  {component: TabsWithContentComponent, path: 'tabs', pathMatch: 'full'},
  {path: '', redirectTo: 'pipes', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
