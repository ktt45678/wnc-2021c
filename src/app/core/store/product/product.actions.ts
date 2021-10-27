import { createAction, props } from '@ngrx/store';

import { Product, Paginated } from '../../models';
import { ICreateProduct, IPaginateProducts, IUpdateProduct } from '../../interfaces/products';

export const findAllProducts = createAction(
  '[Products] Find All Products',
  props<IPaginateProducts>()
);

export const findAllProductsSuccess = createAction(
  '[Products] Find All Products Success',
  props<{ payload: Paginated<Product> }>()
);

export const findAllProductsFailure = createAction(
  '[Products] Find All Products Failure'
);

export const findOneProduct = createAction(
  '[Products] Find One Product',
  props<{ id: number }>()
);

export const findOneProductSuccess = createAction(
  '[Products] Find One Product Success',
  props<{ payload: Product }>()
);

export const findOneProductFailure = createAction(
  '[Products] Find One Product Failure'
);

export const createProduct = createAction(
  '[Products] Create Product',
  props<ICreateProduct>()
);

export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ payload: Product }>()
);

export const createProductFailure = createAction(
  '[Products] Create Product Failure'
);

export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ id: number } & IUpdateProduct>()
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ payload: Product }>()
);

export const updateProductFailure = createAction(
  '[Products] Update Product Failure'
);

export const removeProduct = createAction(
  '[Products] Remove Product',
  props<{ id: number }>()
);

export const removeProductSuccess = createAction(
  '[Products] Remove Product Success'
);

export const removeProductFailure = createAction(
  '[Products] Remove Product Failure'
);

export const destroyProducts = createAction(
  '[Products] Destroy Products'
);