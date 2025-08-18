import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../feature/models/field';
@Component({
  selector: 'app-text-field',
  imports: [MatFormFieldModule, MatInputModule],
  // templateUrl: './text-field.html',
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input
        matInput
        [type]="field().inputType || 'text'"
        [required]="field().required"
        [placeholder]="field().placeholder || ''"
      />
    </mat-form-field>
  `,
  styleUrl: './text-field.scss',
})
export class TextField {
  field = input.required<FormField>();
}
