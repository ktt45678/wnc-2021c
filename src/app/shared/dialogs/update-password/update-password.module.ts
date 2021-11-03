import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { UpdatePasswordComponent } from './update-password.component'
import { DisabledControlModule } from '../../../core/directives/disabled-control';

@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DisabledControlModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [UpdatePasswordComponent]
})
export class UpdatePasswordModule { }
