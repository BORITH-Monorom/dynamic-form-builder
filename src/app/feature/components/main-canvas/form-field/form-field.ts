import { Component, computed, inject, input } from '@angular/core';
import { FieldTypesService } from '../../../services/field-types.service';
import { FormField } from '../../../models/field';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form.service';
import { FieldPreview } from "../field-preview/field-preview";
@Component({
  selector: 'app-form-field',
  imports: [ TitleCasePipe, MatButtonModule, MatIconModule, FieldPreview],
  // templateUrl: './form-field.html',
  template: `
    <div class="content__form-field" 
    [class]="formService.selectedField()?.id === field().id ? 'border border-black':''"
    (click)="formService.setSelectedfield(field().id)">
      <div class="flex items-center justify-between mb-1">
        <span>{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="deleteField($event)">
          <mat-icon>delete</mat-icon>
        </button>
      </div>
      <app-field-preview [field]="field()"></app-field-preview>
    </div>
  `,
  styleUrl: './form-field.scss',
})
export class FormFieldComponent {
  field = input.required<FormField>();
  formService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deleteField(this.field().id);
  }
}
