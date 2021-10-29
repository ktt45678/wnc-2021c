import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { QuillModule } from 'ngx-quill'
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutModule } from '../../shared/layouts/home-layout/home-layout.module';
import { ProductListModule } from '../../shared/components/product-list/product-list.module';
import { FormAutofocusModule } from '../../core/directives/form-autofocus';
import { DisabledControlModule } from '../../core/directives/disabled-control';
import { RelativeTimeModule } from '../../core/pipes/relative-time';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { FindProductsComponent } from './pages/find-products/find-products.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    CreateProductComponent,
    FindProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HomeLayoutModule,
    ProductListModule,
    FormAutofocusModule,
    DisabledControlModule,
    RelativeTimeModule,
    ReactiveComponentModule,
    QuillModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
