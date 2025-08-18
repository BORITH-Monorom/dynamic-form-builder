import { Component, inject } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-field-settings',
  imports: [],
  template: `
    <div class="content h-[calc(100vh-150px)] overflow-y-auto">
      <p>
        field-settings works!
      </p>
    </div>
  `,
  // templateUrl: './field-settings.html',
  styleUrl: './field-settings.scss'
})
export class FieldSettings {
}
