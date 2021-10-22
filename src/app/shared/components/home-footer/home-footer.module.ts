import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeFooterComponent } from './home-footer.component';

@NgModule({
  declarations: [HomeFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HomeFooterComponent]
})
export class HomeFooterModule { }
