import { Component, input, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FieldTypeDefinition } from '../../feature/models/field';
import {DragDropModule} from '@angular/cdk/drag-drop'
@Component({
  selector: 'app-field-button',
  imports: [MatIconModule,DragDropModule],
  // templateUrl: './field-button.html',
  template: `
    <button 
    cdkDrag
    [cdkDragData]="field()"
    (cdkDragStarted)="whileDragging.set(true)"
    (cdkDragEnded)="whileDragging.set(false)"
    class="element-button">
    <div class="element-button__icon">
      <mat-icon class="scale-75">{{field().icon}}</mat-icon>
    </div>
    <span class="element-button__label">{{field().label}}</span>
    <div *cdkDragPlaceholder></div>
    </button>
    @if(whileDragging()){
    <div 
    class="element-button">
    <div class="element-button__icon">
      <mat-icon class="scale-75">{{field().icon}}</mat-icon>
    </div>
    <span class="element-button__label">{{field().label}}</span>
    <div *cdkDragPlaceholder></div>
    </div>
    }
  `,
  styleUrl: './field-button.scss'
})
export class FieldButton {
  field = input.required<FieldTypeDefinition>();
  whileDragging = signal(false)
}
