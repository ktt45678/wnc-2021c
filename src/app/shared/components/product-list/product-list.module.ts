import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductListComponent } from './product-list.component';
import { RelativeTimeModule } from '../../../core/pipes/relative-time';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    RouterModule,
    RelativeTimeModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [ProductListComponent]
})
export class ProductListModule { }
