import { Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';
import { TextField } from '../../shared/field-types/text-field/text-field';
import { CheckboxField } from '../../shared/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../../shared/field-types/select-field/select-field';
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
};

const SELECTED_FIELD_DEFINITION: FieldTypeDefinition ={
    type: 'select',
    label: 'DropDown',
    icon: 'arrow_drop_down_circle',
    component: SelectField,
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
    ]
}
@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldTypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINATION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['select', SELECTED_FIELD_DEFINITION]
  ]);
  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }
  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }
}
