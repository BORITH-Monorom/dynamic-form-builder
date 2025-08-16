import { Component, input } from '@angular/core';
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
    class="button">
    <div class="button__icon">
      <mat-icon>{{field().icon}}</mat-icon>
    </div>
    <span class="button__label">{{field().label}}</span>
    <div *cdkDragPlaceholder></div>
    </button>
  `,
  styleUrl: './field-button.scss'
})
export class FieldButton {
  field = input.required<FieldTypeDefinition>();
}
