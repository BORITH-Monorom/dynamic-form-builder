import { Component, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormField } from '../../../feature/models/field';

@Component({
  selector: 'app-select-field',
  imports: [MatInputModule,MatSelectModule],
  // templateUrl: './select-field.html',
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{field().label}}</mat-label>
      <mat-select [required]="field().required">
        @if(field().options){
          @for(option of field().options; track option.value){  
            <mat-option [value]="option.value">{{option.label}}</mat-option>
          }
        }@else{
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option>
        }
        </mat-select>
    </mat-form-field>
  `,
  styleUrl: './select-field.scss',
})
export class SelectField {
field = input.required<FormField>()
}
