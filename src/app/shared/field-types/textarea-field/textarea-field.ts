import { Component, input } from '@angular/core';
import { FormField } from '../../../feature/models/field';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-textarea-field',
  imports: [MatFormFieldModule],
  // templateUrl: './textarea-field.html',
  template:`
    <mat-form-field>
      <mat-label>{{field().label}}</mat-label>
      <textarea matInput [placeholder]="field().placeholder || ''"></textarea>
    </mat-form-field>
  `,
  styleUrl: './textarea-field.scss'
})
export class TextareaField {
  field = input.required<FormField>();
}
