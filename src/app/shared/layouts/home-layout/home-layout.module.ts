import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeHeaderModule } from '../../components/home-header/home-header.module';
import { HomeFooterModule } from '../../components/home-footer/home-footer.module';
import { HomeLayoutComponent } from './home-layout.component';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HomeHeaderModule,
    HomeFooterModule,
    ReactiveComponentModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  exports: [HomeLayoutComponent]
})
export class HomeLayoutModule { }
