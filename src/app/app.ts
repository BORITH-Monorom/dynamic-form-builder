import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementMenu } from "./feature/components/form-element-menu/form-element-menu";
import { MainCanvas } from "./feature/components/main-canvas/main-canvas";
import { FieldSettings } from "./feature/components/field-settings/field-settings";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormElementMenu, MainCanvas, FieldSettings, DragDropModule],
  // templateUrl: './app.html',
  template:`
  <div class="flex flex-col h-screen px-4">
    <div class="flex flex-col gap-1 items-center py-10 justify-center">
      <h1 class="text-2xl tracking-wide font-medium">Angular Form Designer</h1>
      <p class="text-gray-500">Create beautiful, responsive forms with angular Material and TailwindCSS</p>
    </div>
    <div class="flex gap-4" cdkDropListGroup>
      <app-form-element-menu class="w-64"></app-form-element-menu>
      <app-main-canvas class="flex-1"></app-main-canvas>
      <app-field-settings class="w-64"></app-field-settings>
    </div>
  </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Dynamic-Form-Builder');
}
