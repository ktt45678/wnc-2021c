import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutModule } from '../../shared/layouts/home-layout/home-layout.module';
import { ProductListModule } from '../../shared/components/product-list/product-list.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeLayoutModule,
    ProductListModule,
    ReactiveComponentModule,
    MatButtonModule
  ]
})
export class HomeModule { }
