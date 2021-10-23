import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { UpdateCategoryComponent } from './dialogs/update-category/update-category.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminLayoutModule } from '../../shared/layouts/admin-layout/admin-layout.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    UsersComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AdminModule { }
