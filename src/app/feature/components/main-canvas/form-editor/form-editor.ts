import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefinition, FormField } from '../../../models/field';
import { FormFieldComponent } from "../form-field/form-field";

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent],
  // templateUrl: './form-editor.html',
  template: `
    <div class="p-4">
      @for(row of formService.rows();track row.id){
      <div
        cdkDropList
        (cdkDropListDropped)="onDropInRow($event, row.id)"
        [cdkDropListOrientation]="'mixed'"
        class="editor"
      >
      <div>Row</div>
      <div class="flex gap-4 flex-wrap">
        @for(field of row.fields; track field){
          <!-- <div>{{ field.label }}</div> -->
           <app-form-field class="flex-1" [field]=field></app-form-field>
        }
      </div>
      </div>
      }
    </div>
  `,
  styleUrl: './form-editor.scss',
})
export class FormEditor {
  formService = inject(FormService);
  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      const fieldType = event.item.data as FieldTypeDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig,
      };
      this.formService.addField(newField, rowId, event.currentIndex);
    }
  }
}
