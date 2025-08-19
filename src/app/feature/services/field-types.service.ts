import { Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';
import { TextField } from '../../shared/field-types/text-field/text-field';
import { CheckboxField } from '../../shared/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../../shared/field-types/select-field/select-field';
import { DateField } from '../../shared/field-types/date-field/date-field';
const TEXT_FIELD_DEFINATION: FieldTypeDefinition = {
  type: 'text',
  label: 'Text field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label'
    },
    {
      type: 'text',
      key: 'placeholder',
      label: 'Placeholder'
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required'
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
        {value: 'text',label:'text'},
        {value: 'number',label:'Number'},
        {value: 'email',label:'Email'},
        {value: 'tel',label:'Phone'},
      ]
    },
  ],

  component: TextField,
  generateCode: (field) => `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>${field.label}</mat-label>
      <input
        matInput
        [type]="${field.inputType || 'text'}"
        [required]="${field.required}"
        [placeholder]="${field.placeholder || ''}"
      />
    </mat-form-field>
    `

};
const CHECKBOX_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: ' check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  settingsConfig: [],
  component: CheckboxField,
  generateCode: (field) => `
    <mat-checkbox [required]="${field.required}">${field.label}</mat-checkbox>\n
  `
};

const SELECTED_FIELD_DEFINITION: FieldTypeDefinition ={
    type: 'select',
    label: 'DropDown',
    icon: 'arrow_drop_down_circle',
    defaultConfig: {
        label: 'Select',
        required: false,
        options: [
            {value: 'option1', label: "Option 1"},
            {value: 'option2', label: "Option 2"},
            {value: 'option3', label: "Option 3"},
        ]
    },
    settingsConfig:[
        {type: 'text', key: 'label', label:'Label'},
        {type: 'checkbox', key: 'required', label:'Required'},
        {type: 'dynamic-options', key: 'options', label:'Dropdown Options'},
    ],
    component: SelectField,
    generateCode: (field) => {

      let code =
      `<mat-form-field appearance="outline" class="w-full">\n` +
      `<mat-label>${field.label}</mat-label>\n` +
      `<mat-select [required]="${field.required}">\n`

      if(field.options){
        field.options.forEach(option => {
          code += `<mat-option [value]="${option.value}">${option.label}</mat-option>\n`;
        });
      } else {
        code +=
          `  <mat-option value="option1">Option 1</mat-option>\n` +
          `  <mat-option value="option2">Option 2</mat-option>\n` +
          `  <mat-option value="option3">Option 3</mat-option>\n`;
      }
      code += ` </mat-select>\n` +`</mat-form-field>\n `;
      return code;
    }
}

const DATE_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'date',
  label: 'Date Picker',
  icon: 'date_range',
  defaultConfig:{
    label: 'Choose a date',
    required: false,
  },
  settingsConfig: [
    {
      type: 'text',
      key: 'label',
      label: 'Label'
    },
    {
      type: 'checkbox',
      key: 'required',
      label: 'Required'
    }

  ],
  component: DateField,
  generateCode: (field) => `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>${field.label}</mat-label>
      <input
        matInput
        [type]="'date'"
        [required]="${field.required}"
      />
    </mat-form-field>
    `



}
@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINATION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['select', SELECTED_FIELD_DEFINITION],
    ['date', DATE_FIELD_DEFINITION]
  ]);
  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }
  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }
}
