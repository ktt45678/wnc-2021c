import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { createBid, createBidFailure, createBidSuccess, requestBid, requestBidFailure, requestBidSuccess, approveBid, approveBidFailure, approveBidSuccess, denyBid, denyBidFailure, denyBidSuccess } from '.';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class BidEffects {
  createBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBid),
      switchMap(action =>
        this.productsService.createBid(action.id, action.price).pipe(
          map(() => {
            this.snackBar.open('Đã ra giá thành công', 'Đóng', { duration: 10000 });
            return createBidSuccess();
          }),
          catchError(() => of(createBidFailure()))
        )
      )
    )
  );

  requestBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestBid),
      switchMap(action =>
        this.productsService.requestBid(action.id).pipe(
          map(() => {
            this.snackBar.open('Đã gửi yêu cầu thành công', 'Đóng', { duration: 10000 });
            return requestBidSuccess();
          }),
          catchError(() => of(requestBidFailure()))
        )
      )
    )
  );

  approveBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(approveBid),
      switchMap(action =>
        this.productsService.approveBid(action.id, action.user, action.accept).pipe(
          map(() => {
            this.snackBar.open('Đã phê duyệt yêu cầu thành công', 'Đóng', { duration: 10000 });
            return approveBidSuccess();
          }),
          catchError(() => of(approveBidFailure()))
        )
      )
    )
  );

  denyBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(denyBid),
      switchMap(action =>
        this.productsService.denyBid(action.id, action.user).pipe(
          map(() => {
            this.snackBar.open('Đã từ chối ra giá thành công', 'Đóng', { duration: 10000 });
            return denyBidSuccess();
          }),
          catchError(() => of(denyBidFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, private snackBar: MatSnackBar) { }
}
