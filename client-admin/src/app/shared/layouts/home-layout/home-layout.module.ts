import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeHeaderModule } from '../../components/home-header/home-header.module';
import { HomeFooterModule } from '../../components/home-footer/home-footer.module';
import { HomeLayoutComponent } from './home-layout.component';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeHeaderModule,
    HomeFooterModule
  ],
  exports: [HomeLayoutComponent]
})
export class HomeLayoutModule { }
