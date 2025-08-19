import { ApplicationRef, computed, effect, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';
import { FieldTypesService } from './field-types.service';
import { startViewTransition } from '../utils/view-transition';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  fieldTypesService = inject(FieldTypesService);
  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();
  private appRef = inject(ApplicationRef)
  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap((row) => row.fields)
      .find((f) => f.id === this._selectedFieldId())
  );
  constructor() {
    effect(() =>{
      console.log(this.rows,"readonly  rows")
      console.log(this._rows(),"_rows")
      console.log(this._rows().flatMap(row => row.fields).find((f) => f.id ===this._selectedFieldId()), "selectedField")
      // console.log(this.selectedField(), "selectedField")

    })
    this._rows.set([
      {
        id: crypto.randomUUID(),
        fields: [],
      },
    ]);
  }
  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }

        return { ...row, fields: updatedFields };
      }

      return row;
    });
    startViewTransition(() =>{
      this._rows.set(newRows);
    })
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((f) => f.id !== fieldId),
    }));
    startViewTransition(() =>{
      this._rows.set(newRows);
      this.appRef.tick(); // Ensure the view is updated
    })
  }

  addRow() {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const row = this._rows();

    startViewTransition(() =>{

      this._rows.set([...row, newRow]);
    })
  }

  deleteRow(nowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const rows = this._rows();
    const newRows = rows.filter((row) => row.id !== nowId);
    startViewTransition(() =>{
      this._rows.set(newRows);
      this.appRef.tick(); // Ensure the view is updated
    })
  }

  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ) {
    const rows = this._rows();

    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex((f) => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;

    const newRows = [...rows];
    const fieldsWithRemovedFieldId = newRows[sourceRowIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemovedFieldId;

    const targetRowIndex = newRows.findIndex((r) => r.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }
    this.rows();
  }

  setSelectedfield(fieldId: string){
    this._selectedFieldId.set(fieldId)
  }

  updateField(fieldId: string, data:Partial<FormField> ){
    const rows = this._rows();
    const newRows = rows.map(row =>({
      ...row,
      fields: row.fields.map(f => f.id === fieldId ? {...f, ...data} :f)
    }));
    startViewTransition(() =>{
      this._rows.set(newRows);
      this.appRef.tick(); // Ensure the view is updated
    })
  }

  moveRowUp(rowId: string){
    const rows = this._rows();
    const index = rows.findIndex(r => r.id === rowId);
    if(index > 0){
      const newRows = [...rows];
      const temp = newRows[index - 1];
      newRows[index - 1] = newRows[index];
      newRows[index] = temp;
      startViewTransition(() =>{
        this._rows.set(newRows);
        this.appRef.tick(); // Ensure the view is updated
      })
    }
  }
  moveRowDown(rowId: string){
    const rows = this._rows();
    const index = rows.findIndex(r => r.id === rowId);
    const newRows = [...rows];
    const temp =  newRows[index + 1]
    newRows[index + 1] = newRows[index];
    newRows[index] = temp;
    startViewTransition(() =>{
      this._rows.set(newRows);
      this.appRef.tick(); // Ensure the view is updated
    })
  }

  //Export Related functionality
  exportForm(){
    const formCode = this.generateFormCode();
    console.log(formCode, "Generated Form Code");
    const blob = new Blob([formCode], { type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form.ts';
    link.click();
    window.URL.revokeObjectURL(url);

  }

  generateFormCode(): string{
    let code = this.generateImports();
    code += this.generateComponentDecorator();
    code += ` template: \` \n`;
    code += `  <form class="flex flex-col gap-4">\n`;
    for(const row of this._rows()){
      if(row.fields.length > 0){
        code += `  <div class="flex gap-4 flex-wrap">\n`;
        for(const field of row.fields){
          code += `<div class="flex-1">\n`;
          code += this.generateFieldCode(field);
          code += `  </div>\n`;
        }
        code += `  </div>\n`;
      }
    }
    code += `  </form>\n`;
    code += `  \`\n`;
    code += `  })\n`;
    code += `  export class GeneratedFormComponent {\n`;
    code += `  }\n`;

    return code;
  }

  generateFieldCode(field: FormField): string{
    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.generateCode(field) || ''
  }

  generateImports(): string{
    return(
      `import {Component} from '@angular/core';\n` +
      `import {CommonModule} from '@angular/common';\n` +
      `import {MatInputModule} from '@angular/material/input';\n` +
      `import {MatButtonModule} from '@angular/material/button';\n` +
      `import {MatIconModule} from '@angular/material/icon';\n` +
      `import {MatFormFieldModule} from '@angular/material/form-field';\n` +
      `import {MatSelectModule} from '@angular/material/select';\n` +
      `import {MatCheckboxModule} from '@angular/material/checkbox';\n` +
      `import {MatRadioModule} from '@angular/material/radio';\n` +
      `import {MatDatepickerModule} from '@angular/material/datepicker';\n\n`
    )
  }
  generateComponentDecorator():string{
    return (

      `@Component({\n` +
      `  selector: 'app-dynamic-form',\n` +
      `  standalone: true,\n` +
      `  imports: [\n` +
      `    CommonModule,\n` +
      `    ReactiveFormsModule,\n` +
      `    MatInputModule,\n` +
      `    MatButtonModule\n` +
      `    MatIconModule\n` +
      `    MatFormFieldModule\n` +
      `    MatSelectModule\n` +
      `    MatCheckboxModule\n` +
      `    MatRadioModule\n` +
      `    MatDatepickerModule\n` +
      `  ],\n`
    )
}
}
