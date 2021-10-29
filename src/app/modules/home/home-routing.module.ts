import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from '../../shared/layouts/home-layout/home-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { FindProductsComponent } from './pages/find-products/find-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products/:id',
        component: ProductsComponent
      },
      {
        path: 'create-product',
        component: CreateProductComponent
      },
      {
        path: 'find-products',
        component: FindProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
