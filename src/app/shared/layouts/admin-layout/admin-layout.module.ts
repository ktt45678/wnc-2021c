import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { HomeHeaderModule } from '../../components/home-header/home-header.module';
import { HomeFooterModule } from '../../components/home-footer/home-footer.module';
import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeHeaderModule,
    HomeFooterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule { }
