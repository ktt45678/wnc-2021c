import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { findAllProducts, findAllProductsSuccess, findAllProductsFailure, findOneProduct, findOneProductFailure, findOneProductSuccess, updateProduct, updateProductFailure, updateProductSuccess, createProduct, createProductFailure, createProductSuccess, removeProduct, removeProductFailure, removeProductSuccess, findTopEndProducts, findTopEndProductsFailure, findTopEndProductsSuccess, findTopBidProducts, findTopBidProductsFailure, findTopBidProductsSuccess, findTopPriceProducts, findTopPriceProductsFailure, findTopPriceProductsSuccess, findRelatedProductsSuccess, findRelatedProductsFailure, findRelatedProducts } from '.';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class ProductEffects {
  findAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findAllProducts),
      switchMap(action =>
        this.productsService.findAll(action.page, action.limit, action.search, action.sort, action.category, action.ended, action.seller, action.winner).pipe(
          map(data => findAllProductsSuccess({ payload: data })),
          catchError(() => of(findAllProductsFailure()))
        )
      )
    )
  );

  findOneProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findOneProduct),
      switchMap(action =>
        this.productsService.findOne(action.id).pipe(
          map(data => findOneProductSuccess({ payload: data })),
          catchError(() => of(findOneProductFailure()))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap(action =>
        this.productsService.create(action.name, action.description, action.category, action.startingPrice, action.priceStep, action.autoRenew, action.expiry, action.images, action.buyPrice).pipe(
          map(data => {
            this.snackBar.open('Tạo sản phẩm thành công', 'Đóng', { duration: 10000 });
            return createProductSuccess({ payload: data });
          }),
          catchError(() => of(createProductFailure()))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(action =>
        this.productsService.update(action.id, action.description).pipe(
          map(data => {
            this.snackBar.open('Cập nhật sản phẩm thành công', 'Đóng', { duration: 10000 });
            return updateProductSuccess({ payload: data });
          }),
          catchError(() => of(updateProductFailure()))
        )
      )
    )
  );

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProduct),
      switchMap(action =>
        this.productsService.remove(action.id).pipe(
          map(() => {
            this.snackBar.open('Gỡ sản phẩm thành công', 'Đóng', { duration: 10000 });
            return removeProductSuccess();
          }),
          catchError(() => of(removeProductFailure()))
        )
      )
    )
  );

  findTopEndProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findTopEndProducts),
      switchMap(() =>
        this.productsService.findAll(1, 5, undefined, 'asc(expiry)', undefined, false).pipe(
          map(data => findTopEndProductsSuccess({ payload: data.results })),
          catchError(() => of(findTopEndProductsFailure()))
        )
      )
    )
  );

  findTopBidProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findTopBidProducts),
      switchMap(() =>
        this.productsService.findAll(1, 5, undefined, 'desc(bidCount)', undefined, false).pipe(
          map(data => findTopBidProductsSuccess({ payload: data.results })),
          catchError(() => of(findTopBidProductsFailure()))
        )
      )
    )
  );

  findTopPriceProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findTopPriceProducts),
      switchMap(() =>
        this.productsService.findAll(1, 5, undefined, 'desc(displayPrice)', undefined, false).pipe(
          map(data => findTopPriceProductsSuccess({ payload: data.results })),
          catchError(() => of(findTopPriceProductsFailure()))
        )
      )
    )
  );

  findRelatedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findRelatedProducts),
      switchMap(action =>
        this.productsService.findAll(1, 5, undefined, 'asc(_id)', action.category, false, undefined, undefined, action.except).pipe(
          map(data => findRelatedProductsSuccess({ payload: data.results })),
          catchError(() => of(findRelatedProductsFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, private snackBar: MatSnackBar) { }
}
