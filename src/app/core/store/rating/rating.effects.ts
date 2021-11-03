import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { createRating, createRatingFailure, createRatingSuccess, findAllRatings, findAllRatingsFailure, findAllRatingsSuccess } from '.';
import { ProductsService } from '../../services/products.service';
import { RatingsService } from '../../services/ratings.service';

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

  findAllRatings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findAllRatings),
      switchMap(action =>
        this.ratingsService.findAll(action.page, action.limit, action.sort, action.target).pipe(
          map(data => findAllRatingsSuccess({ payload: data })),
          catchError(() => of(findAllRatingsFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, private ratingsService: RatingsService, private snackBar: MatSnackBar) { }
}
