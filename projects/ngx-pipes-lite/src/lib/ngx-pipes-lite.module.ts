import {NgModule} from '@angular/core';
import {AjaxGetJsonPipe} from "./pipes/ajax-get-json.pipe";
import {TruncPipe} from "./pipes/trunc.pipe";
import {HttpClientModule} from "@angular/common/http";

export const PIPES = [AjaxGetJsonPipe, TruncPipe];

@NgModule({
  declarations: PIPES,
  imports: [HttpClientModule],
  exports: PIPES
})
export class NgxPipesLiteModule {
}
