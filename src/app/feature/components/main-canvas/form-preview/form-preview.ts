import { Component, inject, input } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FormField } from '../../../models/field';
import { FieldPreview } from "../field-preview/field-preview";

@Component({
  selector: 'app-form-preview',
  imports: [FieldPreview],
  template: `
  <div class="content">
    @for(row of formService.rows(); track row.id){
      <div class="flex flex-warp gap-4">
        @for(field of row.fields; track field.id){
        <app-field-preview class="flex-1" [field]="field"></app-field-preview>
        }
      </div>
    }
  </div>
  `,
  // templateUrl: './form-preview.html',
  styleUrl: './form-preview.scss'
})
export class FormPreview {
formService = inject(FormService)

}
