import { createReducer, on } from '@ngrx/store';

import { StoreStatus } from '../../enums/store-status.enum';
import { Product, Paginated } from '../../models';
import { createProduct, createProductFailure, createProductSuccess, destroyProducts, findAllProducts, findAllProductsFailure, findAllProductsSuccess, findOneProduct, findOneProductFailure, findOneProductSuccess, removeProduct, removeProductFailure, removeProductSuccess, updateProduct, updateProductFailure, updateProductSuccess } from './product.actions';

export interface ProductState {
  findAllProductsStatus: StoreStatus;
  findOneProductStatus: StoreStatus;
  createProductStatus: StoreStatus;
  updateProductStatus: StoreStatus;
  removeProductStatus: StoreStatus;
  product: Product | null;
  productList: Paginated<Product>;
}

export const initialState: ProductState = {
  findAllProductsStatus: StoreStatus.INIT,
  findOneProductStatus: StoreStatus.INIT,
  createProductStatus: StoreStatus.INIT,
  updateProductStatus: StoreStatus.INIT,
  removeProductStatus: StoreStatus.INIT,
  product: null,
  productList: new Paginated<Product>()
}

export const productReducer = createReducer(
  initialState,
  on(createProduct, (state) => ({
    ...state,
    createProductStatus: StoreStatus.LOADING
  })),
  on(createProductSuccess, (state, action) => ({
    ...state,
    product: action.payload,
    createProductStatus: StoreStatus.SUCCESS
  })),
  on(createProductFailure, (state) => ({
    ...state,
    createProductStatus: StoreStatus.FAILURE
  })),
  on(findAllProducts, (state) => ({
    ...state,
    findAllProductsStatus: StoreStatus.LOADING
  })),
  on(findAllProductsSuccess, (state, action) => ({
    ...state,
    productList: action.payload,
    findAllProductsStatus: StoreStatus.SUCCESS
  })),
  on(findAllProductsFailure, (state) => ({
    ...state,
    findAllProductsStatus: StoreStatus.FAILURE
  })),
  on(findOneProduct, (state) => ({
    ...state,
    findOneProductStatus: StoreStatus.LOADING
  })),
  on(findOneProductSuccess, (state, action) => ({
    ...state,
    product: action.payload,
    findOneProductStatus: StoreStatus.SUCCESS
  })),
  on(findOneProductFailure, (state) => ({
    ...state,
    findOneProductStatus: StoreStatus.FAILURE
  })),
  on(updateProduct, (state) => ({
    ...state,
    updateProductStatus: StoreStatus.LOADING
  })),
  on(updateProductSuccess, (state, action) => ({
    ...state,
    product: action.payload,
    updateProductStatus: StoreStatus.SUCCESS
  })),
  on(updateProductFailure, (state) => ({
    ...state,
    updateProductStatus: StoreStatus.FAILURE
  })),
  on(removeProduct, (state) => ({
    ...state,
    removeProductStatus: StoreStatus.LOADING
  })),
  on(removeProductSuccess, (state) => ({
    ...state,
    removeProductStatus: StoreStatus.SUCCESS
  })),
  on(removeProductFailure, (state) => ({
    ...state,
    removeProductStatus: StoreStatus.FAILURE
  })),
  on(destroyProducts, () => ({
    ...initialState
  }))
);
