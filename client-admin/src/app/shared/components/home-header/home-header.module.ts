import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomeHeaderComponent } from './home-header.component';

@NgModule({
  declarations: [HomeHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [HomeHeaderComponent]
})
export class HomeHeaderModule { }
