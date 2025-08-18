import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldTypeDefinition, FormField } from '../../../models/field';
import { FormFieldComponent } from "../form-field/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-editor',
  imports: [DragDropModule, FormFieldComponent,MatIconModule, MatButtonModule,DragDropModule],
  // templateUrl: './form-editor.html',
  template: `
    <div class="p-4">
      @for(row of formService.rows();track row.id){
      <div
        cdkDropList
        [cdkDropListData]="row.id"
        (cdkDropListDropped)="onDropInRow($event, row.id)"
        [cdkDropListOrientation]="'mixed'"
        class="editor mb-4"
      >
      <div class="flex justify-between items-center">
       <span>Row</span>
       <button mat-icon-button (click)="this.formService.deleteRow(row.id)">
         <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="flex gap-4 flex-wrap">
        @for(field of row.fields; track field){
          <!-- <div>{{ field.label }}</div> -->
           <app-form-field cdkDrag [cdkDragData]="field" class="flex-1" [field]=field></app-form-field>
        }@empty {
         <div class="default-empty">
          Drag and drop form element here
         </div>   
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
      return
    }

    const dragData = event.item.data as FormField;
    const previousRowId = event.previousContainer.data as string;

    this.formService.moveField(dragData.id, previousRowId, rowId, event.currentIndex)
  }

}
