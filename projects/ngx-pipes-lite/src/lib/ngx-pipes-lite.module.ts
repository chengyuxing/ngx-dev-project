import {NgModule} from '@angular/core';
import {AjaxGetJsonPipe} from "./pipes/ajax-get-json.pipe";
import {TruncPipe} from "./pipes/trunc.pipe";
import {HttpClientModule} from "@angular/common/http";
import {PagingPipe} from "./pipes/paging.pipe";
import {MathPipe} from "./pipes/math.pipe";
import {ZipPipe} from "./pipes/zip.pipe";
import {GroupPipe} from "./pipes/group.pipe";

export const PIPES = [
  AjaxGetJsonPipe,
  TruncPipe,
  PagingPipe,
  MathPipe,
  ZipPipe,
  GroupPipe
];

@NgModule({
  declarations: PIPES,
  imports: [HttpClientModule],
  exports: PIPES
})
export class NgxPipesLiteModule {
}
