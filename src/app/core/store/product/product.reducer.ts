import { createReducer, on } from '@ngrx/store';

import { StoreStatus } from '../../enums/store-status.enum';
import { Product, Paginated } from '../../models';
import { createProduct, createProductFailure, createProductSuccess, destroyProducts, findAllProducts, findAllProductsFailure, findAllProductsSuccess, findOneProduct, findOneProductFailure, findOneProductSuccess, removeProduct, removeProductFailure, removeProductSuccess, updateProduct, updateProductFailure, updateProductSuccess, findTopEndProducts, findTopEndProductsFailure, findTopEndProductsSuccess, findTopBidProducts, findTopBidProductsFailure, findTopBidProductsSuccess, findTopPriceProducts, findTopPriceProductsFailure, findTopPriceProductsSuccess, findRelatedProducts, findRelatedProductsFailure, findRelatedProductsSuccess } from './product.actions';

export interface ProductState {
  findAllProductsStatus: StoreStatus;
  findOneProductStatus: StoreStatus;
  createProductStatus: StoreStatus;
  updateProductStatus: StoreStatus;
  removeProductStatus: StoreStatus;
  findTopEndProductsStatus: StoreStatus;
  findTopBidProductsStatus: StoreStatus;
  findTopPriceProductsStatus: StoreStatus;
  findRelatedProductsStatus: StoreStatus;
  product: Product | null;
  productList: Paginated<Product>;
  topEndProducts: Product[];
  topBidProducts: Product[];
  topPriceProducts: Product[];
  relatedProducts: Product[];
}

export const initialState: ProductState = {
  findAllProductsStatus: StoreStatus.INIT,
  findOneProductStatus: StoreStatus.INIT,
  createProductStatus: StoreStatus.INIT,
  updateProductStatus: StoreStatus.INIT,
  removeProductStatus: StoreStatus.INIT,
  findTopEndProductsStatus: StoreStatus.INIT,
  findTopBidProductsStatus: StoreStatus.INIT,
  findTopPriceProductsStatus: StoreStatus.INIT,
  findRelatedProductsStatus: StoreStatus.INIT,
  product: null,
  productList: new Paginated<Product>(),
  topEndProducts: [],
  topBidProducts: [],
  topPriceProducts: [],
  relatedProducts: []
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
  on(updateProductSuccess, (state) => ({
    ...state,
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
  })),
  on(findTopEndProducts, (state) => ({
    ...state,
    findTopEndProductsStatus: StoreStatus.LOADING
  })),
  on(findTopEndProductsSuccess, (state, action) => ({
    ...state,
    topEndProducts: action.payload,
    findTopEndProductsStatus: StoreStatus.SUCCESS
  })),
  on(findTopEndProductsFailure, (state) => ({
    ...state,
    findTopEndProductsStatus: StoreStatus.FAILURE
  })),
  on(findTopBidProducts, (state) => ({
    ...state,
    findTopBidProductsStatus: StoreStatus.LOADING
  })),
  on(findTopBidProductsSuccess, (state, action) => ({
    ...state,
    topBidProducts: action.payload,
    findTopBidProductsStatus: StoreStatus.SUCCESS
  })),
  on(findTopBidProductsFailure, (state) => ({
    ...state,
    findTopBidProductsStatus: StoreStatus.FAILURE
  })),
  on(findTopPriceProducts, (state) => ({
    ...state,
    findTopPriceProductsStatus: StoreStatus.LOADING
  })),
  on(findTopPriceProductsSuccess, (state, action) => ({
    ...state,
    topPriceProducts: action.payload,
    findTopPriceProductsStatus: StoreStatus.SUCCESS
  })),
  on(findTopPriceProductsFailure, (state) => ({
    ...state,
    findTopPriceProductsStatus: StoreStatus.FAILURE
  })),
  on(findRelatedProducts, (state) => ({
    ...state,
    findRelatedProductsStatus: StoreStatus.LOADING
  })),
  on(findRelatedProductsSuccess, (state, action) => ({
    ...state,
    relatedProducts: action.payload,
    findRelatedProductsStatus: StoreStatus.SUCCESS
  })),
  on(findRelatedProductsFailure, (state) => ({
    ...state,
    findRelatedProductsStatus: StoreStatus.FAILURE
  }))
);
