import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from '../../shared/layouts/home-layout/home-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { FindProductsComponent } from './pages/find-products/find-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { Role } from '../../core/enums/role.enum';
import { AuthGuard } from '../../core/guards/auth.guard';

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
        canActivate: [AuthGuard],
        data: {
          roles: [Role.SELLER],
          fromJwt: false
        },
        component: CreateProductComponent
      },
      {
        path: 'find-products',
        component: FindProductsComponent
      },
      {
        path: 'profiles',
        canActivate: [AuthGuard],
        data: {
          roles: [Role.BIDDER, Role.SELLER],
          fromJwt: false
        },
        component: ProfilesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
