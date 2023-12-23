import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-with-content',
  template: `
      <mat-tab-group preserveContent>
          <mat-tab label="tab1">
              <label for="">Name:<input type="text"></label><br><br>
              <label for="">Id:<input type="text"></label><br><br>
              <label for="">Age:<input type="text"></label>
          </mat-tab>
          <mat-tab label="tab2">
              <label for="">Address:<input type="text"></label>
          </mat-tab>
      </mat-tab-group>
  `,
  styles: [
  ]
})
export class TabsWithContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
