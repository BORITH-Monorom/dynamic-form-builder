import { Component, inject, signal } from '@angular/core';
import { FormEditor } from './form-editor/form-editor';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreview } from "./form-preview/form-preview";
import { FieldPreview } from "./field-preview/field-preview";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like @if
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-main-canvas',
  standalone: true, // Assuming this is a standalone component based on the imports array
  imports: [
    FormEditor,
    MatButtonToggleModule,
    FormPreview,
    MatIconModule,
    MatButtonModule,
    CommonModule // CommonModule is needed for @if
  ],
  template: `
    <div class="content h-[calc(100vh-150px)] overflow-y-auto p-4">
      <div class="flex gap-4 justify-between items-center mb-6">
        <h3 class="content__title text-2xl font-semibold text-gray-800">Form Canvas</h3>
        <div class="flex items-center space-x-4">
          <mat-button-toggle-group [(value)]="activeTab">
            <mat-button-toggle value="editor">Editor</mat-button-toggle>
            <mat-button-toggle value="preview">Preview</mat-button-toggle>
          </mat-button-toggle-group>

          <!-- The 'Add Row' button with animation -->
          <button
            mat-flat-button
            color="primary"
            class="transition-all duration-300"
            [@buttonVisibility]="activeTab() === 'editor' ? 'visible' : 'hidden'"
            (click)="addRow()"
          >
            Add Row
            <mat-icon>add_circle</mat-icon>
          </button>
        </div>
      </div>

      <!-- The main canvas content with a fade animation -->
      <div
        class="tab-content relative"
        [@tabFade]="activeTab()"
      >
        <div class="absolute inset-0">
          @if(activeTab() === 'editor'){
            <app-form-editor class="block w-full h-full"></app-form-editor>
          } @else if(activeTab() === 'preview') {
            <app-form-preview class="block w-full h-full"></app-form-preview>
          }
        </div>
      </div>
    </div>
    
  `,
  styleUrl: './main-canvas.scss',
  animations: [
    // This animation handles the fade-in/fade-out of the main content area
    trigger('tabFade', [
      state('editor', style({ opacity: 1, transform: 'translateY(0)' })),
      state('preview', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out')
      ])
    ]),

    // This animation handles the slide/fade of the 'Add Row' button
    trigger('buttonVisibility', [
      // The 'visible' state for the button
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)',
        width: '*' // Using '*' to allow width to be dynamic
      })),

      // The 'hidden' state for the button
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.5)',
        width: '0px',
        margin: '0',
        padding: '0'
      })),

      // The transition between states
      transition('visible <=> hidden', [
        animate('200ms ease-in-out')
      ])
    ])
  ],
})
export class MainCanvas {
  // field = input.required<FormField>();
  activeTab = signal<'editor' | 'preview'>('editor');
  formService = inject(FormService)
  // Method to be called when the button is clicked (you can add your logic here)
  addRow() {
  this.formService.addRow()
  }
}
