import { Component, input } from '@angular/core';
import { FormField } from '../../../feature/models/field';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckboxModule],
  // templateUrl: './checkbox-field.html',
  template:`
  <mat-checkbox [required]="field().required">
    {{field().label}}
  </mat-checkbox>
  `,
  styleUrl: './checkbox-field.scss'
})
export class CheckboxField {
field = input.required<FormField>()
}
