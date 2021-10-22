import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomeHeaderComponent } from './home-header.component';

@NgModule({
  declarations: [HomeHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveComponentModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [HomeHeaderComponent]
})
export class HomeHeaderModule { }
