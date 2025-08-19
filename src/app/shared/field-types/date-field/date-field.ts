import { Component, input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormField } from '../../../feature/models/field';
@Component({
  selector: 'app-date-field',
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule],
  // templateUrl: './date-field.html',
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input [required]="field().required" matInput [matDatepicker]="picker" />
      <mat-hint>MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
      ></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styleUrl: './date-field.scss',
})
export class DateField {
  field = input.required<FormField>();
}
