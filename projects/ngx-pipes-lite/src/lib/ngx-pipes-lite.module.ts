import {NgModule} from '@angular/core';
import {AjaxGetJsonPipe} from "./pipes/ajax-get-json.pipe";
import {TruncPipe} from "./pipes/trunc.pipe";
import {HttpClientModule} from "@angular/common/http";
import {PagingPipe} from "./pipes/paging.pipe";
import {MathPipe} from "./pipes/math.pipe";
import {ZipPipe} from "./pipes/zip.pipe";

export const PIPES = [
  AjaxGetJsonPipe,
  TruncPipe,
  PagingPipe,
  MathPipe,
  ZipPipe
];

@NgModule({
  declarations: PIPES,
  imports: [HttpClientModule],
  exports: PIPES
})
export class NgxPipesLiteModule {
}
