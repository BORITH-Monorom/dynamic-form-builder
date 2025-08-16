import { Component, computed, inject, input } from '@angular/core';
import { FieldTypesService } from '../../../services/field-types.service';
import { FormField } from '../../../models/field';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../../services/form.service';
@Component({
  selector: 'app-form-field',
  imports: [NgComponentOutlet,TitleCasePipe, MatButtonModule, MatIconModule],
  // templateUrl: './form-field.html',
  template: `
    <div class="content__form-field">
    <div class="flex items-center justify-between mb-1">
        <span>{{field().type | titlecase}}</span>
        <button mat-icon-button (click)="deleteField($event)">
          <mat-icon class="-mr-2">delete</mat-icon>
        </button>
    </div>
    <ng-container [ngComponentOutlet]="previewComponent()"
    [ngComponentOutletInputs]="{field: field()}"
    ></ng-container>
    </div>
  `,
  styleUrl: './form-field.scss'
})
export class FormFieldComponent {
field = input.required<FormField>();
formService = inject(FormService)

fieldTypesService = inject(FieldTypesService)

previewComponent = computed(() =>{
  const type = this.fieldTypesService.getFieldType(this.field().type);
  return type?.component ?? null;
})

deleteField(e: Event){
  e.stopPropagation()
  this.formService.deleteField(this.field().id)
}
}
