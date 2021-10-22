import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormAutofocusDirective } from './form-autofocus.directive';

@NgModule({
  declarations: [FormAutofocusDirective],
  imports: [CommonModule],
  exports: [FormAutofocusDirective]
})
export class FormAutofocusModule { }
