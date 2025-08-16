import { Component } from '@angular/core';
import { FormEditor } from "./form-editor/form-editor";

@Component({
  selector: 'app-main-canvas',
  imports: [FormEditor],
  // templateUrl: './main-canvas.html',
  template: ` 
  <div class="content">
    <h3 class="content__title">Form Canvas</h3>

    <app-form-editor></app-form-editor>
  </div>
  `,
  styleUrl: './main-canvas.scss'
})
export class MainCanvas {

}
