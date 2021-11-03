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
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ViewCategoryComponent } from './dialogs/view-category/view-category.component';
import { CreateCategoryComponent } from './dialogs/create-category/create-category.component';
import { UpdateCategoryComponent } from './dialogs/update-category/update-category.component';
import { RemoveCategoryComponent } from './dialogs/remove-category/remove-category.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminLayoutModule } from '../../shared/layouts/admin-layout/admin-layout.module';
import { RelativeTimeModule } from '../../core/pipes/relative-time';
import { RemoveProductComponent } from './dialogs/remove-product/remove-product.component';
import { UpgradeUserComponent } from './dialogs/upgrade-user/upgrade-user.component';
import { DowngradeUserComponent } from './dialogs/downgrade-user/downgrade-user.component';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';
import { BanUserComponent } from './dialogs/ban-user/ban-user.component';
import { UnbanUserComponent } from './dialogs/unban-user/unban-user.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    RemoveCategoryComponent,
    UsersComponent,
    ProductsComponent,
    ViewCategoryComponent,
    RemoveProductComponent,
    UpgradeUserComponent,
    DowngradeUserComponent,
    UpdateUserComponent,
    BanUserComponent,
    UnbanUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    RelativeTimeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ]
})
export class AdminModule { }
