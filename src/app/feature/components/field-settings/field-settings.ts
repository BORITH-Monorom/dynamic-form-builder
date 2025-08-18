import { Component, computed, effect, inject } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FieldTypesService } from '../../services/field-types.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DynamicOptions } from "./dynamic-options/dynamic-options";

@Component({
  selector: 'app-field-settings',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInput,
    MatCheckboxModule,
    MatSelectModule,
    DynamicOptions
],
  template: `
    <div class="content h-[calc(100vh-150px)] overflow-y-auto">
      @if(formService.selectedField(); as selectedField){
      <h3 class="text-xl font-medium mb-6">Field Properties</h3>
      <div class="flex flex-col gap-4">
        @for(setting of fieldSettings(); track setting.key){ @switch
        (setting.type) { @case('text'){
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>{{ setting.label }}</mat-label>
          <input
            matInput
            [ngModel]="fieldValues()[setting.key]"
            (ngModelChange)="updateField(selectedField.id, setting.key, $event)"
          />
        </mat-form-field>
        } @case('checkbox'){
        <mat-checkbox
          [ngModel]="fieldValues()[setting.key]"
          (ngModelChange)="updateField(selectedField.id, setting.key, $event)"
        >
          {{ setting.label }}
        </mat-checkbox>
        } @case('select'){
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>{{ setting.label }}</mat-label>
          <mat-select
            [ngModel]="fieldValues()[setting.key]"
            (ngModelChange)="updateField(selectedField.id, setting.key, $event)"
          >
            @for(option of setting.options || []; track option.value){
            <mat-option [value]="option.value">
              {{ option.label }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        } @case('dynamic-options'){
          <app-dynamic-options
          [title]="setting.label" 
          [options]="fieldValues()[setting.key]"
          (optionsChange)="updateField(selectedField.id, setting.key, $event)"
          ></app-dynamic-options>
        }
        
      } }
      </div>
      }
    </div>
  `,
  // templateUrl: './field-settings.html',
  styleUrl: './field-settings.scss',
})
export class FieldSettings {
  formService = inject(FormService);
  FieldTypesService = inject(FieldTypesService);
  constructor() {
    effect(() => {
      console.log(this.fieldSettings(), 'this.fieldSettings');
    });
  }

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return [];

    const fieldDef = this.FieldTypesService.getFieldType(field.type);
    console.log(fieldDef, 'fieldDef');
    return fieldDef?.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) return {};
    return field as any;
  });
  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId,{[key]: value})
  }
}
