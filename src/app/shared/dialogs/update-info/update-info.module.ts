import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { UpdateInfoComponent } from './update-info.component'
import { DisabledControlModule } from '../../../core/directives/disabled-control';

@NgModule({
  declarations: [UpdateInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DisabledControlModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  exports: [UpdateInfoComponent]
})
export class UpdateInfoModule { }
