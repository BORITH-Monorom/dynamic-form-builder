import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { FieldTypesService } from '../../../services/field-types.service';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  template: `
         <ng-container
        [ngComponentOutlet]="previewComponent()"
        [ngComponentOutletInputs]="{ field: field() }"
      ></ng-container>
  `,
  // templateUrl: './field-preview.html',
  styleUrl: './field-preview.scss'
})
export class FieldPreview {
  field = input.required<FormField>();
  fieldTypesService = inject(FieldTypesService);

  previewComponent = computed(() => {
    const type = this.fieldTypesService.getFieldType(this.field().type);
    return type?.component ?? null;
  });
}
