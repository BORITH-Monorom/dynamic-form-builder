import { Injectable } from "@angular/core";
import { FieldTypeDefinition } from "../models/field";
import { TextField } from "../../shared/field-types/text-field/text-field";
import { CheckboxField } from "../../shared/field-types/checkbox-field/checkbox-field";
const TEXT_FIELD_DEFINATION = {
    type: 'text',
    label: 'Text field',
    icon: 'text_fields',
    defaultConfig:{
        label: "Text Field",
        required: false
    },
    component: TextField
}
const CHECKBOX_FIELD_DEFINITION = {
    type:'checkbox',
    label:'Checkbox',
    icon:' check_box',
    defaultConfig:{
        label: "Checkbox",
        required: false
    },
    component: CheckboxField
}
@Injectable({
    providedIn: 'root'
})
export class FieldTypesService{
    fieldTypes = new Map<string, FieldTypeDefinition>([
        ['text', TEXT_FIELD_DEFINATION],
        ['checkbox', CHECKBOX_FIELD_DEFINITION]
    ])
    getFieldType(type: string):FieldTypeDefinition | undefined{
        return this.fieldTypes.get(type);
    }
    getAllFieldTypes(): FieldTypeDefinition[]{
        return Array.from(this.fieldTypes.values());
    }
}