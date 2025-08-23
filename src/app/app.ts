import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementMenu } from './feature/components/form-element-menu/form-element-menu';
import { MainCanvas } from './feature/components/main-canvas/main-canvas';
import { FieldSettings } from './feature/components/field-settings/field-settings';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from './feature/services/form.service';
import { ThemeService } from './feature/services/theme';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormElementMenu,
    MainCanvas,
    FieldSettings,
    DragDropModule,
  ],
  // templateUrl: './app.html',
  template: `
    <div class="fixed bottom-5 right-5">
      <button matIconButton [matMenuTriggerFor]="themeMenu">
        <mat-icon>{{ themeService.get_current_theme().icon }}</mat-icon>
      </button>
      <mat-menu #themeMenu="matMenu">
        @for(theme of this.themeService.themes; track theme.name){
        <button mat-menu-item (click)="themeService.setTheme(theme)">
          {{ theme.name }}
          <mat-icon>{{ theme.icon }}</mat-icon>
        </button>
        }
      </mat-menu>
    </div>

    <div class="flex flex-col h-screen px-4 ">
      <div
        class="flex flex-col gap-1 items-center py-10 justify-center sticky top-0 z-11"
      >
        <h1 class="text-4xl tracking-wide font-medium">
          Angular Form Designer
        </h1>
        <p class="text-on-surface-variant">
          Create beautiful, responsive forms with angular Material and
          TailwindCSS
        </p>
      </div>

      <div
        class="flex justify-end p-4 bg-background  [view-transition-name:top-header] z-10"
      >
        <button mat-flat-button (click)="formService.exportForm()">
          Export Form <mat-icon>download</mat-icon>
        </button>
      </div>
      <div class="flex gap-4" cdkDropListGroup>
        <app-form-element-menu class="w-64"></app-form-element-menu>
        <app-main-canvas class="flex-1"></app-main-canvas>
        <app-field-settings class="w-64"></app-field-settings>
      </div>
    </div>
  `,
  styleUrl: './app.scss',
})
export class App {
  formService = inject(FormService);
  themeService = inject(ThemeService);
  protected readonly title = signal('Dynamic-Form-Builder');
}
