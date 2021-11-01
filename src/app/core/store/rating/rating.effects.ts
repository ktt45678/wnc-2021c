import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { createRating, createRatingFailure, createRatingSuccess } from '.';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class RatingEffects {
  createRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRating),
      switchMap(action =>
        this.productsService.createProductRating(action.id, action.ratingType, action.comment).pipe(
          map(() => {
            this.snackBar.open('Đã gửi đánh giá thành công', 'Đóng', { duration: 10000 });
            return createRatingSuccess();
          }),
          catchError(() => of(createRatingFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, private snackBar: MatSnackBar) { }
}
