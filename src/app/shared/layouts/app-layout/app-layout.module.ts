import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppLayoutComponent } from './app-layout.component';
import { HomeHeaderModule } from '../../components/home-header/home-header.module';
import { HomeFooterModule } from '../../components/home-footer/home-footer.module';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeHeaderModule,
    HomeFooterModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
