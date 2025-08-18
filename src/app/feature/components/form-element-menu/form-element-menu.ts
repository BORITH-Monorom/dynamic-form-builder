import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types.service';
import { FieldButton } from "../../../shared/field-button/field-button";
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-element-menu',
  imports: [FieldButton ,DragDropModule],
  // templateUrl: './form-element-menu.html',
  template:`
  <div class="content h-[calc(100vh-150px)] overflow-y-auto">
    <h3 class="content__title">Form Elements</h3>
    <div class="flex flex-col gap-4 elements-menu"
    cdkDropList
    cdkDropListSortingDisabled="true"
    [cdkDropListData]="'field-selector'"
    [cdkDropListEnterPredicate]="noDropAllowed"
    >
      @for(type of fieldTypes; track type.type){
        <app-field-button [field]="type"></app-field-button>
      }
    </div>
  </div>
  `,
  styleUrl: './form-element-menu.scss'
})
export class FormElementMenu {
fieldTypesService = inject(FieldTypesService)

fieldTypes = this.fieldTypesService.getAllFieldTypes()

noDropAllowed(item: CdkDrag<any>){
  return false;
}
}
