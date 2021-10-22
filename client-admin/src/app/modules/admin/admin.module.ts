import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { UpdateCategoryComponent } from './dialogs/update-category/update-category.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';

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
    AdminRoutingModule
  ]
})
export class AdminModule { }